import axios from 'axios'
import { AuthConst } from './auth/constant'
import type { AuthResponse } from './auth/type'
import { HttpStatus } from './http'
import { authApiPaths } from './auth/paths'
import utils from '@/utils'

const { UNAUTHORIZED, FORBIDDEN, NOT_FOUND } = HttpStatus

const DEVELOPMENT_BASE_URL = 'http://localhost:5000'
const PRODUCTION_BASE_URL = 'https://vnailticket-api.onrender.com'

const getBaseUrl = () => {
  // if (process.env.NODE_ENV === 'development') return DEVELOPMENT_BASE_URL
  return PRODUCTION_BASE_URL
}

export const AxiosClient = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true
})

AxiosClient.interceptors.request.use(
  (config) => {
    if (typeof window !== undefined) {
      if (window.localStorage.getItem(AuthConst.LOCAL_STORAGE_KEY)) {
        const auth = JSON.parse(
          window.localStorage.getItem(AuthConst.LOCAL_STORAGE_KEY) ?? ''
        ) as AuthResponse
        if (auth) config.headers['Authorization'] = `Bearer ${auth.accessToken}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

AxiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config
    const response = error?.response

    if (localStorage.getItem(AuthConst.LOCAL_STORAGE_KEY)) {
      const storage: AuthResponse = JSON.parse(
        localStorage.getItem(AuthConst.LOCAL_STORAGE_KEY) ?? ''
      ) as AuthResponse

      if (!storage) return Promise.reject(error)

      if (
        (response?.status === UNAUTHORIZED ||
          response?.status === FORBIDDEN ||
          response?.status === NOT_FOUND) &&
        !config?._retry
      ) {
        const { info } = storage
        config._retry = true

        try {
          const apiPath = getBaseUrl() + authApiPaths.refresh + utils.getQuery({ accountId: info.id })
          const res = await axios.post(apiPath)
          const data = res.data
          const newAuth: AuthResponse = {
            ...storage,
            accessToken: data.accessToken,
            expired: data.expired
          }
          localStorage.setItem(AuthConst.LOCAL_STORAGE_KEY, JSON.stringify(newAuth))
          config.headers['Authorization'] = `Bearer ${data.accessToken}`
          return axios(config)
        } catch (error) {
          return Promise.reject(error)
        }
      }
    }

    return Promise.reject(error)
  }
)

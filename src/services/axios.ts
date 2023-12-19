import axios from 'axios'
import { AuthConst } from './auth/constant'
import type { AuthResponse } from './auth/type'
import { HttpStatus } from './http'
import { authApiPaths } from './auth/paths'

const { UNAUTHORIZED, FORBIDDEN, NOT_FOUND } = HttpStatus

const BASE_URL = 'http://localhost:5000'

export const AxiosClient = axios.create({
  baseURL: BASE_URL,
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
          const res = await axios.post(`${BASE_URL}${authApiPaths.refresh}`, { accountId: info.id })
          const data = res.data
          const newAuth = {
            ...storage,
            accessToken: data.accessToken,
            expiredIn: data.expiredIn
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

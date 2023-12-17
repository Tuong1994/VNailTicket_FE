import axios from 'axios'
import { AuthConst } from './auth/constant'
import type { AuthResponse } from './auth/type'

export const AxiosClient = axios.create({
  baseURL: 'http://localhost:5000',
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

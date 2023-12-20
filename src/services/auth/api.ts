import type { Query, Response } from '../type'
import type { Account, AuthResponse } from './type'
import { AxiosClient } from '../axios'
import { authApiPaths } from './paths'
import { AuthConst } from './constant'
import utils from '@/utils'

export const authApis = {
  async signIn(account: Account) {
    const res: Response<AuthResponse> = utils.defaultResponse<AuthResponse>()
    try {
      const fetch = await AxiosClient.post<AuthResponse>(authApiPaths.signIn, account)
      localStorage.setItem(AuthConst.LOCAL_STORAGE_KEY, JSON.stringify(fetch.data))
      res.success = fetch.data
    } catch (error) {
      res.error = utils.getErrorResponse(error)
    }
    return res
  },

  async refresh(query: Query) {
    const res: Response<AuthResponse> = utils.defaultResponse<AuthResponse>()
    try {
      const fetch = await AxiosClient.post<AuthResponse>(
        authApiPaths.refresh + utils.getQuery(query)
      )
      if (localStorage.getItem(AuthConst.LOCAL_STORAGE_KEY)) {
        const storage = JSON.parse(localStorage.getItem(AuthConst.LOCAL_STORAGE_KEY) ?? '') as AuthResponse
        const auth: AuthResponse = { ...storage, accessToken: storage.accessToken, expired: storage.expired }
        localStorage.setItem(AuthConst.LOCAL_STORAGE_KEY, JSON.stringify(auth))
      }
      res.success = fetch.data
    } catch (error) {
      res.error = utils.getErrorResponse(error)
    }
    return res
  },

  async logout(query: Query) {
    const res: Response<any> = utils.defaultResponse<any>()
    try {
      const fetch = await AxiosClient.post<any>(
        authApiPaths.logout + utils.getQuery(query)
      )
      localStorage.removeItem(AuthConst.LOCAL_STORAGE_KEY)
      res.success = fetch.data
    } catch (error) {
      res.error = utils.getErrorResponse(error)
    }
    return res
  }
}

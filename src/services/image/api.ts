import utils from '@/utils'
import type { Query, Response, ResponseSuccess } from '../type'
import type { Image } from './type'
import { AxiosClient } from '../axios'
import { imageApiPaths } from './paths'

export const imageApis = {
  async getList() {
    const res: Response<Image[]> = utils.defaultResponse<Image[]>()
    try {
      const fetch = await AxiosClient.get<ResponseSuccess<Image[]>>(imageApiPaths.getList)
      res.success = fetch.data
    } catch (error) {
      res.error = utils.getErrorResponse(error)
    }
    return res
  },

  async uploadImages(data: FormData) {
    const res: Response<any> = utils.defaultResponse<any>()
    try {
      const fetch = await AxiosClient.post<ResponseSuccess<any>>(imageApiPaths.upload, data)
      res.success = fetch.data
    } catch (error) {
      res.error = utils.getErrorResponse(error)
    }
    return res
  },

  async removeImages(query: Query) {
    const res: Response<any> = utils.defaultResponse<any>()
    try {
      const fetch = await AxiosClient.delete<ResponseSuccess<any>>(
        imageApiPaths.remove + utils.getQuery(query)
      )
      res.success = fetch.data
    } catch (error) {
      res.error = utils.getErrorResponse(error)
    }
    return res
  }
}

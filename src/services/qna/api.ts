import { AxiosClient } from '../axios'
import type { Query, Response, ResponseSuccess } from '../type'
import type { QnA } from './type'
import { qnaApiPaths } from './paths'
import utils from '@/utils'

export const qnaApis = {
  async getList() {
    const res: Response<QnA[]> = utils.defaultResponse<QnA[]>()
    try {
      const fetch = await AxiosClient.get<ResponseSuccess<QnA[]>>(qnaApiPaths.getList)
      res.success = fetch.data
    } catch (error: any) {
      res.error = utils.getErrorResponse(error)
    }
    return res
  },

  async getDetail(query: Query) {
    const res: Response<QnA> = utils.defaultResponse<QnA>()
    try {
      const fetch = await AxiosClient.get<ResponseSuccess<QnA>>(qnaApiPaths.getDetail + utils.getQuery(query))
      res.success = fetch.data
    } catch (error) {
      res.error = utils.getErrorResponse(error)
    }
    return res
  },

  async create(data: QnA) {
    const res: Response<QnA> = utils.defaultResponse<QnA>()
    try {
      const fetch = await AxiosClient.post<ResponseSuccess<QnA>>(qnaApiPaths.create, data)
      res.success = fetch.data
    } catch (error) {
      res.error = utils.getErrorResponse(error)
    }
    return res
  },

  async update(query: Query, data: QnA) {
    const res: Response<any> = utils.defaultResponse<any>()
    try {
      const fetch = await AxiosClient.put<ResponseSuccess<any>>(
        qnaApiPaths.update + utils.getQuery(query),
        data
      )
      res.success = fetch.data
    } catch (error) {
      res.error = utils.getErrorResponse(error)
    }
    return res
  },

  async remove(query: Query) {
    const res: Response<any> = utils.defaultResponse<any>()
    try {
      const fetch = await AxiosClient.delete<ResponseSuccess<any>>(qnaApiPaths.remove + utils.getQuery(query))
      res.success = fetch.data
    } catch (error) {
      res.error = utils.getErrorResponse(error)
    }
    return res
  }
}

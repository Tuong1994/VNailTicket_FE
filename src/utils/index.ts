import type { Query, Response, ResponseError, ResponseSuccess } from '@/services/type'

const utils = {
  uuid: () => {
    const s4 = () =>
      Math.floor((1 + Math.random()) * 0x100000)
        .toString(16)
        .substring(1)
    return `${s4()}-${s4()}-${s4()}/${s4()}-${s4()}-${s4()}`
  },

  defaultResponse: <M>(): Response<M> => {
    const response: Response<M> = {
      success: {} as ResponseSuccess<M>,
      error: null
    }
    return response
  },

  getErrorResponse: (error: any) => {
    if (error.response && error.response.data) {
      const errorData = error.response.data
      const responseError: ResponseError = {
        statusCode: errorData.statusCode ?? 0,
        errorText: errorData.error ?? '',
        message: errorData.message ?? ''
      }
      return responseError
    }
    return null
  },

  getQuery: (query: Query) => {
    if (Object.keys(query).length === 0) return
    const { qnaItemId, imageId, accountId } = query
    let rs = '?'
    imageId && (rs += `&imageId=${imageId}`)
    qnaItemId && (rs += `&qnaItemId=${qnaItemId}`)
    accountId && (rs += `&accountId=${accountId}`)
    return rs
  }
}

export default utils

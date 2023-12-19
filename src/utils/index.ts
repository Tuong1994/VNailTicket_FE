import type { Query, Response, ResponseError, ResponseSuccess } from '@/services/type'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

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
    const { qnaItemId, imageId, accountId, ids, limit } = query
    let rs = '?'
    ids && (rs += `&ids=${ids}`)
    imageId && (rs += `&imageId=${imageId}`)
    qnaItemId && (rs += `&qnaItemId=${qnaItemId}`)
    accountId && (rs += `&accountId=${accountId}`)
    limit && (rs += `&limit=${limit}`)
    return rs
  },

  formatQuill: (data: any) => {
    let content
    try {
      if (!data) return
      const parseData = JSON.parse(data ?? '')

      if (parseData && parseData.ops) {
        const quill = new Quill(document.createElement('div'))
        quill.setContents(parseData.ops)
        content = quill.root.innerHTML
      } else {
        content = parseData
      }
    } catch (error) {
      content = data
    }
    return content
  }
}

export default utils

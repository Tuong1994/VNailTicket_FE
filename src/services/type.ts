export type Query = {
  ids?: string
  qnaItemId?: string
  accountId?: string
  imageId?: string
  limit?: number
}

export type ResponseSuccess<M = unknown> = {
  data: M
}

export type ResponseError = {
  statusCode: number
  message: string
  errorText: string
}

export type Response<M = unknown> = {
  success: M
  error: ResponseError | null
}

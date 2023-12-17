export type Query = {
  qnaItemId?: string
  accountId?: string
  imageId?: string
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
  success: ResponseSuccess<M>
  error: ResponseError | null
}

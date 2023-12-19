export type Image = {
  id?: string
  path: string
  size: number
  publicId: string
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type ImageResponse = {
  totalItems: number
  data: Image[]
}

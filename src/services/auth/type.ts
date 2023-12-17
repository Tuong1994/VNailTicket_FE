export type Auth = {
  id?: string
  token: string
  accountId: string
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type Account = {
  id?: string
  account: string
  password: string
  auth?: Auth
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type AuthResponse = {
  accessToken: string
  info: Pick<Account, 'id' | 'account'>
  expired: number
  isAuth: boolean
}

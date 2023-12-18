export type ToastType = 'success' | 'error' | 'warning' | 'info'

export type ToastMessage = {
  id: string
  type: ToastType
  message: string
}

export type ToastMessages = ToastMessage[]

export type ToastMessageApi = {
  success: (message: string) => void
  error: (message: string) => void
  warning: (message: string) => void
  info: (message: string) => void
}

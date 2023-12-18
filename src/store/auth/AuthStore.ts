import { ref } from 'vue'
import type { AuthResponse } from '@/services/auth/type'
import { defineStore } from 'pinia'

const useAuthStore = defineStore('auth', () => {
  const auth = ref<AuthResponse | null>(null)
  const addAuth = (authData: AuthResponse) => (auth.value = authData)
  const resetAuth = () => auth.value = null

  return { auth, addAuth, resetAuth }
})

export default useAuthStore

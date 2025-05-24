import { defineStore } from 'pinia'
import authApi from '@/api/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),

  actions: {
    async login(credentials) {
      const { token } = await authApi.login(credentials)
      localStorage.setItem('token', token)
      await this.fetchUser()
    },

    async fetchUser() {
      try {
        this.user = await authApi.getUser()
        this.user.remaining_requests
      } catch {
        this.logout()
      }
    },

    logout() {
      localStorage.removeItem('token')
      this.user = null
      window.location.href = '/login'
    }
  }
})

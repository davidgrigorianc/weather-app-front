import axios from '../plugins/axios'

export default {
  async login(credentials) {
    const response = await axios.post('/login', credentials)
    localStorage.setItem('token', response.data.token)
    return response.data
  },

  async getUser() {
    const response = await axios.get('/me')
    return response.data
  },

  isAuthenticated() {
    return !!localStorage.getItem('token')
  }
}

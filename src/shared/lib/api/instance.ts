import axios from 'axios'
import { refreshToken } from '../../../features/auth/api/refreshToken'
import { tokenStorage } from './tokenStorage'

export const api = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use(config => {
  const token = tokenStorage.getAccessToken()
  if (token) config.headers!['Authorization'] = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  res => res,
  async error => {
    if (error.response?.status === 401) {
      const newToken = await refreshToken()
      error.config.headers['Authorization'] = `Bearer ${newToken}`
      return axios(error.config) 
    }
    return Promise.reject(error)
  }
)

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
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const newToken = await refreshToken()

        if (newToken && originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`
          return api(originalRequest)
        }
      } catch (refreshError) {
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

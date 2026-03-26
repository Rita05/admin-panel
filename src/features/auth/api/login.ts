import axios from 'axios'
import { api } from '../../../shared/lib/api/instance'

interface IErrorAuthResponse {
  message: string
}

export interface IAuthResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  accessToken: string
  refreshToken: string
}

export const login = async (
  username: string,
  password: string
): Promise<IAuthResponse> => {
  try {
    const response = await api.post<IAuthResponse>(
      '/auth/login',
      {
        username,
        password
      }
    )

    return response.data
  } catch (error) {
    if (axios.isAxiosError<IErrorAuthResponse>(error)) {
      throw new Error(error.response?.data?.message || 'Ошибка авторизации')
    }

    throw new Error('Неизвестная ошибка')
  }
}

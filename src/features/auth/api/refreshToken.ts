import {api} from "../../../shared/lib/api/instance"
import { tokenStorage } from "../../../shared/lib/api/tokenStorage"

interface IRefreshResponse {
  accessToken: string
  refreshToken?: string
}

export const refreshToken = async (): Promise<string> => {
  const refreshToken = tokenStorage.getRefreshToken()
  if (!refreshToken) throw new Error('No refresh token')

  const response = await api.post<IRefreshResponse>(
    '/auth/refresh',
    {
      refreshToken,
      expiresInMins: 30
    }
  )

  const { accessToken, refreshToken: newRefreshToken } = response.data

  tokenStorage.setAccessToken(accessToken, true)
  if (newRefreshToken) {
    tokenStorage.setRefreshToken(newRefreshToken)
  }

  return accessToken
}
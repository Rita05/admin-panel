export const tokenStorage = {
  getAccessToken: (): string | null => {
    return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
  },

  setAccessToken: (token: string, remember: boolean) => {
    const storage = remember ? localStorage : sessionStorage
    storage.setItem('accessToken', token)
  },

  setRefreshToken: (token: string) => localStorage.setItem('refreshToken', token),
  getRefreshToken: () => localStorage.getItem('refreshToken'),

  remove: () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    sessionStorage.removeItem('accessToken')
  }
}

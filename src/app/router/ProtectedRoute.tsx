import { Navigate, Outlet } from 'react-router-dom'
import { tokenStorage } from '../../shared/lib/api/tokenStorage'

export const ProtectedRoute = () => {
  const token = tokenStorage.getAccessToken()

  if (!token) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}

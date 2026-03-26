import { Navigate, Outlet } from "react-router-dom"
import { tokenStorage } from "../../shared/lib/api/tokenStorage"


export const PublicRoute = () => {
    const token = tokenStorage.getAccessToken()
  
    if (token) {
			return <Navigate to="/products" replace />
		}
  
    return <Outlet />
}
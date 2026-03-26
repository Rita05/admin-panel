import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../../pages/auth/ui/LoginPage'
import { NotFoundPage } from '../../pages/not-found/ui/NotFoundPage'
import { ProductsPage } from '../../pages/products/ui/ProductsPage'
import { ProtectedRoute } from './ProtectedRoute'
import { PublicRoute } from './PublicRoute'

export const PATH = {
  LOGIN: '/login',
  PRODUCTS: '/products'
} as const 

export const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Navigate to={PATH.LOGIN} replace />} />
        <Route element={<PublicRoute />}>
        <Route path={PATH.LOGIN} element={<LoginPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path={PATH.PRODUCTS} element={<ProductsPage/>} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </HashRouter>
  )
}

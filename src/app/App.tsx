import React from 'react'
import { Provider } from 'react-redux'
import { AppRouter } from './router/AppRouter'
import { store } from '../entities/products/products/model/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
        <AppRouter />
    </Provider>
    </QueryClientProvider>
  )
}

export default App

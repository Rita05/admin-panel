import axios from 'axios'
import { api } from '../../../../shared/lib/api/instance'
import { IProduct } from '../../../../shared/types/productsTypes'

export type TSortKey = 'title' | 'price' | 'rating' | 'category'
export type TSortOrder = 'asc' | 'desc'

interface IFetchProductsParams {
  page: number
  search: string
  sortKey: TSortKey | null
  sortOrder: TSortOrder
  limit: number
}

export interface IProductsResponse {
  products: IProduct[]
  total: number
  skip: number
  limit: number
}

// export const fetchProducts = async (
//   params: IFetchProductsParams
// ): Promise<IProductsResponse> => {
//   const { page, search, sortKey, sortOrder, limit } = params
//   const skip = (page - 1) * limit

//   let url = ''

//   if (search) {
//     url = `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`
//   } else {
//     url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
//   }

//   if (sortKey) {
//     url += `&sortBy=${sortKey}&order=${sortOrder}`
//   }

//   const response = await axios.get(url)
//   return response.data
// }

export const fetchProducts = async (
  params: IFetchProductsParams
): Promise<IProductsResponse> => {
  const { page, search, sortKey, sortOrder, limit } = params
  const skip = (page - 1) * limit

  const endpoint = search ? '/products/search' : '/products'

  const response = await api.get<IProductsResponse>(endpoint, {
    params: {
      ...(search && { q: search }),
      limit,
      skip,
      ...(sortKey && {
        sortBy: sortKey,
        order: sortOrder
      })
    }
  })

  return response.data
}

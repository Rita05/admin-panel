import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { IProduct } from '../../../../shared/types/productsTypes'
import { fetchProducts, IProductsResponse } from '../api/fetchProducts'
import { AppDispatch, AppRootState } from './store'

const LIMIT = 20

export type TSortKey = 'title' | 'price' | 'rating' | 'category'
export type TSortOrder = 'asc' | 'desc'

interface IProductsState {
  items: IProduct[]
  total: number
  page: number
  search: string
  sortKey: TSortKey | null
  sortOrder: TSortOrder
  isLoading: boolean
}

const initialState: IProductsState = {
  items: [],
  total: 0,
  page: 1,
  search: '',
  sortKey: null,
  sortOrder: 'asc',
  isLoading: false
}

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootState
  dispatch: AppDispatch
  rejectValue: null | string
}>()

export const getProducts = createAppAsyncThunk<
  IProductsResponse, 
  void               
>(
  'products/fetch',
  async (_, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI

    const state = getState()
    const { page, search, sortKey, sortOrder } = state.products

    try {
      const data = await fetchProducts({
        page,
        search,
        sortKey,
        sortOrder,
        limit: LIMIT
      })

      return data
    }catch (error: unknown) {
        if (error instanceof Error) {
          return rejectWithValue(error?.message)
        }
        return rejectWithValue('Неизвестная ошибка')
    }
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
      state.page = 1
    },
    setSortByColumn(state, action: PayloadAction<TSortKey>) {
      if (state.sortKey === action.payload) {
        state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc'
      } else {
        state.sortKey = action.payload
      }
      state.page = 1
    },
    setSortOrder(state) {
      state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc'
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.items = action.payload.products
        state.total = action.payload.total
        state.isLoading = false
      })
      .addCase(getProducts.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export const { setPage, setSearch, setSortByColumn, setSortOrder } = productsSlice.actions
export default productsSlice.reducer
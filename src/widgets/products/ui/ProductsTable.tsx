import { useEffect, useMemo, useState } from 'react'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  TableContainer
} from '@mui/material'

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

import PlusCircleIcon from '../../../shared/assets/icons/PlusCircle.svg'
import RefreshIcon from '../../../shared/assets/icons/arrows.svg'
import FilterListIcon from '@mui/icons-material/FilterList'

import { ProductTableRow } from '../../../entities/products/products/ui/ProductTableRow'
import { ProductsPagination } from '../../../entities/products/products/ui/ProductsPagination'
import { AddProductModal } from '../../../features/products/add-product/ui/AddProductModal'
import { useDispatch, useSelector } from 'react-redux'
import {
  AppDispatch,
  AppRootState
} from '../../../entities/products/products/model/store'
import {
  getProducts,
  setPage,
  setSortByColumn,
  setSortOrder,
  TSortKey
} from '../../../entities/products/products/model/productsSlice'

export const ProductsTable = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const dispatch = useDispatch<AppDispatch>()

  const { items, page, total, sortKey, sortOrder, search, isLoading } =
    useSelector((state: AppRootState) => state.products)

  useEffect(() => {
    setSelectedIds([])
  }, [page, search, sortKey, sortOrder])

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch, page, sortKey, sortOrder, search])

  const currentPageIds = useMemo(() => {
    return items?.map(p => p.id) ?? []
  }, [items])

  const isAllSelected = useMemo(() => {
    return (
      currentPageIds.length > 0 &&
      currentPageIds.every(id => selectedIds.includes(id))
    )
  }, [currentPageIds, selectedIds])

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value))
  }

  const handleSortByColumn = (key: TSortKey) => {
    dispatch(setSortByColumn(key))
  }

  const handleToggleSortOrder = () => {
    dispatch(setSortOrder())
  }

  const handleRefetch = () => {
    dispatch(getProducts())
  }

  const handleToogleOpenModal = () => {
    setIsOpenModal(true)
  }

  const handleToggleSelect = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([])
    } else {
      setSelectedIds(currentPageIds)
    }
  }

  return (
    <Box
      sx={{
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        marginTop: '30px'
      }}
    >
      <Box
        sx={{
          padding: '30px 30px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography
          variant='h4'
          sx={{
            fontSize: 20,
            fontFamily: 'Inter'
          }}
        >
          Все позиции
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            boxSizing: 'border-box'
          }}
        >
          <Button
            sx={{
              borderRadius: 1,
              width: 42,
              minHeight: 42,
              height: '100%',
              minWidth: 42,
              border: '1px solid #ECECEB',
              padding: 0,

              '&:hover': {
                backgroundColor: 'transparent',
                boxShadow: 'none'
              }
            }}
            onClick={handleRefetch}
          >
            <img src={RefreshIcon} alt='resresh table icon' />
          </Button>
          <Button
            sx={{
              borderRadius: 1,
              width: 42,
              minHeight: 42,
              height: '100%',
              minWidth: 42,
              border: '1px solid #ECECEB',
              padding: 0,

              '&:hover': {
                backgroundColor: 'transparent',
                boxShadow: 'none'
              }
            }}
            onClick={handleToggleSortOrder}
          >
            <FilterListIcon
              sx={{
                color: '#8C8C8C',
                transform: `rotate(${sortOrder === 'asc' ? '180deg' : '0'})`
              }}
            />
          </Button>
          <Button
            startIcon={
              <img
                src={PlusCircleIcon}
                alt='plus circle icon'
                width={22}
                height={22}
              />
            }
            sx={{
              backgroundColor: '#242EDB',
              color: '#ffffff',
              fontFamily: 'Cairo-SemiBold, sans-serif',
              maxWidth: '147px',
              minHeight: '42px',
              height: '100%',
              width: '100%',
              padding: '8px 20px',
              fontSize: 14,
              textTransform: 'none',
              boxSizing: 'border-box'
            }}
            onClick={handleToogleOpenModal}
          >
            Добавить
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          mx: '30px'
        }}
      >
        <TableContainer
          sx={{
            width: '100%',
            overflowX: 'auto'
          }}
        >
          <Table
            sx={{
              px: 3.75,
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell padding='checkbox'>
                  <Checkbox
                    sx={{
                      color: '#C7C7C7',
                      '&.Mui-checked': {
                        color: '#3C538E'
                      }
                    }}
                    checked={isAllSelected}
                    onChange={handleToggleSelectAll}
                  />
                </TableCell>

                <TableCell
                  sx={{
                    color: '#B2B3B9',
                    fontFamily: 'Inter',
                    fontSize: 16,

                    '&:hover': {
                      '& .sortIcon': {
                        opacity: 1,
                        cursor: 'pointer'
                      }
                    }
                  }}
                  onClick={() => handleSortByColumn('title')}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    Наименование
                    <ArrowUpwardIcon
                      className='sortIcon'
                      fontSize='small'
                      sx={{
                        opacity: sortKey === 'title' ? 1 : 0,
                        transform:
                          sortKey === 'title' && sortOrder === 'desc'
                            ? 'rotate(180deg)'
                            : 'rotate(0deg)',
                        transition: '0.2s'
                      }}
                    />
                  </Box>
                </TableCell>
                <TableCell
                  sx={{
                    color: '#B2B3B9',
                    fontFamily: 'Inter',
                    fontSize: 16,

                    '&:hover': {
                      '& .sortIcon': {
                        opacity: 1,
                        cursor: 'pointer'
                      }
                    }
                  }}
                  onClick={() => handleSortByColumn('category')}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    Вендор
                    <ArrowUpwardIcon
                      className='sortIcon'
                      fontSize='small'
                      sx={{
                        opacity: sortKey === 'category' ? 1 : 0,
                        transform:
                          sortKey === 'category' && sortOrder === 'desc'
                            ? 'rotate(180deg)'
                            : 'rotate(0deg)',
                        transition: '0.2s',
                        marginLeft: '3px'
                      }}
                    />
                  </Box>
                </TableCell>
                <TableCell
                  sx={{
                    color: '#B2B3B9',
                    fontFamily: 'Inter',
                    fontSize: 16
                  }}
                >
                  Артикул
                </TableCell>
                <TableCell
                  sx={{
                    color: '#B2B3B9',
                    fontFamily: 'Inter',
                    fontSize: 16,
                    '&:hover': {
                      '& .sortIcon': {
                        opacity: 1,
                        cursor: 'pointer'
                      }
                    }
                  }}
                  onClick={() => handleSortByColumn('rating')}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    Оценка
                    <ArrowUpwardIcon
                      className='sortIcon'
                      fontSize='small'
                      sx={{
                        opacity: sortKey === 'rating' ? 1 : 0,
                        transform:
                          sortKey === 'rating' && sortOrder === 'desc'
                            ? 'rotate(180deg)'
                            : 'rotate(0deg)',
                        transition: '0.2s',
                        marginLeft: '3px'
                      }}
                    />
                  </Box>
                </TableCell>
                <TableCell
                  sx={{
                    color: '#B2B3B9',
                    fontFamily: 'Inter',
                    fontSize: 16,
                    '&:hover': {
                      '& .sortIcon': {
                        opacity: 1,
                        cursor: 'pointer'
                      }
                    }
                  }}
                  onClick={() => handleSortByColumn('price')}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    Цена, ₽
                    <ArrowUpwardIcon
                      className='sortIcon'
                      fontSize='small'
                      sx={{
                        opacity: sortKey === 'price' ? 1 : 0,
                        transform:
                          sortKey === 'price' && sortOrder === 'desc'
                            ? 'rotate(180deg)'
                            : 'rotate(0deg)',
                        transition: '0.2s',
                        marginLeft: '3px'
                      }}
                    />
                  </Box>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            {isLoading ? (
              <Box
                sx={{
                  minHeight: '50px',
                  marginTop: '50px'
                }}
              >
                <CircularProgress
                  sx={{
                    position: 'absolute',
                    left: '50%'
                  }}
                />
              </Box>
            ) : (
              <TableBody>
                {items?.map(p => (
                  <ProductTableRow
                    key={p.id}
                    product={p}
                    isSelected={selectedIds.includes(p.id)}
                    onSelect={() => handleToggleSelect(p.id)}
                  />
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Box>
      <ProductsPagination
        page={page}
        total={total}
        onChangePage={handlePageChange}
      />
      <AddProductModal
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
    </Box>
  )
}

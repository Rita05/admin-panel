import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import debounce from 'lodash/debounce'

import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'

import SearchIcon from '../../../shared/assets/icons/search.svg'
import { setSearch } from '../../../entities/products/products/model/productsSlice'

export const ProductsHeader = () => {

	const dispatch = useDispatch()

  const [searchValue, setSearchValue] = useState<string>()

	const debouncedSearch = useCallback(
    debounce((value: string) => {
      dispatch(setSearch(value))          
    }, 500),
    [dispatch]
  )

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    debouncedSearch(e.target.value)
  }

  const handleClearSearchValue = () => {
    setSearchValue('')
    dispatch(setSearch('')) 
  }

	 
  return (
    <Box
      sx={{
        backgroundColor: '#ffffff',
        py: 3.25,
        display: 'flex',
        gap: 'clamp(16px, 5vw, 403.5px)',
        alignItems: 'center'
      }}
    >
      <Typography
        variant='h3'
        sx={{
          paddingLeft: '30px',
          fontSize: 24,
          fontFamily: 'Inter'
        }}
      >
        Товары
      </Typography>
      <TextField
			  value={searchValue}
			  onChange={handleChange}
        placeholder='Найти'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <img src={SearchIcon} alt='search icon' width={24} height={24} />
            </InputAdornment>
          ),
          endAdornment: searchValue ? (
            <InputAdornment position='end'>
              <IconButton
                size="small"
                onClick={handleClearSearchValue}
                sx={{
                  '&:hover': {
                    backgroundColor: 'transparent' 
                  }
                }}
              >
                <ClearIcon 
                  fontSize="small" 
                />
              </IconButton>
            </InputAdornment>
          ) : null,
          sx: {
            fontFamily: 'Inter',
            fontSize: 14,
            color: '#232323'
          }
        }}
        sx={{
          width: 'clamp(200px, 50%, 1023px)',
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#F3F3F3',
            borderRadius: 1
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none'
          },
          '& .MuiOutlinedInput-input': {
            padding: '12px 20px'
          },
          '& .MuiOutlinedInput-input::placeholder': {
            color: '#999999',
            opacity: 1
          }
        }}
      />
    </Box>
  )
}

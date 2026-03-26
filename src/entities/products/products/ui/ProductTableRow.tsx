import {
  TableRow,
  TableCell,
  Checkbox,
  Box,
  Typography,
  Button,
  IconButton
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { IProduct } from '../../../../shared/types/productsTypes'

export interface IProductProps {
  product: IProduct
  isSelected: boolean
  onSelect: () => void
}

export const ProductTableRow = (props: IProductProps) => {
  const { product, isSelected, onSelect } = props
  const {title, sku, rating, price, thumbnail, brand, category} = product;

  return (
    <TableRow 
      hover
      sx={{
        borderLeft: isSelected ? '3px solid #3C538E' : '3px solid transparent',
      }}
    >
      <TableCell padding='checkbox'>
        <Checkbox
          sx={{
            color: '#C7C7C7',
            '&.Mui-checked': {
              color: '#3C538E'
            }
          }}
          checked={isSelected}
          onChange={onSelect}
        />
      </TableCell>

      <TableCell>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box
            component='img'
            src={thumbnail}
            sx={{ width: 48, height: 48, borderRadius: 1 }}
          />

          <Box>
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontSize: '16px'
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{ fontSize: 14, color: '#999', fontFamily: 'Inter-Regular' }}
            >
              {category}
            </Typography>
          </Box>
        </Box>
      </TableCell>

      <TableCell
        sx={{
          fontFamily: 'Open-Sans',
          fontSize: '16px'
        }}
      >
        {brand}
      </TableCell>
      <TableCell
        sx={{
          fontSize: '16px',
          fontFamily: 'Inter-Regular'
        }}
      >
        {sku}
      </TableCell>
      <TableCell
        sx={{
          fontSize: '16px',
          fontFamily: 'Inter-Regular',
        }}
      >
        <Typography
          component='span'
          sx={{
            color: rating < 3.5 ? '#F11010' : 'inherit'
          }}
        >
          {rating}
        </Typography>
        /<Typography component='span'>5</Typography>
      </TableCell>
      <TableCell
        sx={{
          fontFamily: 'Roboto-Mono',
          fontSize: '16px'
        }}
      >
        {price},
        <Typography component='span' sx={{ color: '#999' }}>
          00
        </Typography>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '35px' }}>
          <Button
            variant='contained'
            sx={{
              width: 52,
              height: 27,
              borderRadius: '23px',
              backgroundColor: '#242EDB'
            }}
          >
            <AddIcon sx={{ color: '#fff' }} />
          </Button>

          <IconButton
            sx={{
              width: 26,
              height: 26,
              border: '2px solid #C7C7C7',
              color: '#999'
            }}
          >
            <MoreHorizIcon />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  )
}

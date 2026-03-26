import { Box, Typography, Pagination, PaginationItem } from "@mui/material"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

interface IProductsPaginationProps {
    page: number
    onChangePage: (_: React.ChangeEvent<unknown>, value: number) => void
		total: number
}

export const ProductsPagination = (props: IProductsPaginationProps) => { 
  const {page, onChangePage, total} = props;
  return (
    <Box
      sx={{
        px: 3.75,
        paddingTop: '40px',
        paddingBottom: '37px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Inter-Regular',
          fontSize: 18
        }}
      >
        <Typography
          sx={{
            color: '#C4C4C4'
          }}
          component='span'
        >
          Показано
        </Typography>{' '}
        {(page - 1) * 20 + 1} – {Math.min(page * 20, total ?? 0)}{' '}
        <Typography
          sx={{
            color: '#C4C4C4'
          }}
          component='span'
        >
          из
        </Typography>{' '}
        {total ?? 0}
      </Typography>
      <Pagination
        count={Math.max(1, Math.ceil((total ?? 0) / 20))}
        onChange={onChangePage}
        page={page}
        renderItem={item => (
          <PaginationItem
            {...item}
            slots={{
              previous: ArrowBackIosNewIcon,
              next: ArrowForwardIosIcon
            }}
            sx={{
              borderRadius: '4px',
              border:
                item.type === 'previous' || item.type === 'next'
                  ? 'none'
                  : '1px solid #ECECEB',

              color: '#999',
              width: '30px',
              height: '30px',

              '&.Mui-selected': {
                backgroundColor: '#797FEA',
                color: '#fff',
                border: 'none'
              },

              '&:hover': {
                backgroundColor: '#f5f5f5'
              }
            }}
          />
        )}
      />
    </Box>
  )
}

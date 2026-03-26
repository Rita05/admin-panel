import { Box } from '@mui/material'
import { ProductsHeader } from '../../../widgets/products/ui/ProductsHeader'
import { ProductsTable } from '../../../widgets/products/ui/ProductsTable'


export const ProductsPage = () => {

  return (
    <Box
      sx={{
        backgroundColor: '#F6F6F6',
				minHeight: '100vh',
        paddingTop: '20px'
      }}
    >
			<ProductsHeader/>
      <ProductsTable />
    </Box>
  )
}


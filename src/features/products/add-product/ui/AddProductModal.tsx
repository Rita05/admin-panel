import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Snackbar,
  IconButton,
	Alert
} from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

type FormValues = {
  title: string
  price: number
  category: string
  sku: string
}

type Props = {
  open: boolean
  onClose: () => void
}

export const AddProductModal = (props: Props) => {
  const { open, onClose } = props
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      title: '',
      price: 0,
      category: '',
      sku: ''
    }
  })

  const onSubmit = (data: FormValues) => {
    console.log('product added:', data)

    setSnackbarOpen(true)
    reset()
    onClose()
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
        <DialogTitle
          sx={{
            fontSize: 20,
            fontFamily: 'Inter',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          Добавить товар
          <IconButton
            onClick={onClose}
            size='small'
            sx={{
              padding: 0,

              '&:hover': {
                backgroundColor: 'transparent'
              }
            }}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            display='flex'
            flexDirection='column'
            gap={2}
            mt={1}
          >
            <TextField
              label='Наименование'
              {...register('title', { required: true })}
              error={!!errors.title}
              helperText={errors.title && 'Обязательное поле'}
            />

            <TextField
              label='Цена'
              type='number'
							inputProps={{ min: 0, step: 0.01 }}
              {...register('price', {
                required: true,
                valueAsNumber: true,
                min: 0
              })}
              error={!!errors.price}
              helperText={errors.price && 'Обязательное поле'}
            />

            <TextField 
						  label='Вендор' 
							{...register('category', {
								required: true
							})} 
							error={!!errors.category}
              helperText={errors.category && 'Обязательное поле'}
						/>

            <TextField 
						  label='Артикул' 
							{...register('sku', {
								required: true
							})} 
							error={!!errors.sku}
              helperText={errors.sku && 'Обязательное поле'}
						/>

            <Button
              type='submit'
              variant='contained'
              sx={{
                backgroundColor: '#242EDB'
              }}
            >
              Добавить
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
				<Alert 
				 severity="success"
				 onClose={() => setSnackbarOpen(false)}
				 sx={{ width: '100%' }}
				>
				Товар успешно добавлен
			</Alert>
			</Snackbar>
    </>
  )
}

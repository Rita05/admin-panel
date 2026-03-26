import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
  Paper,
  InputLabel,
  Snackbar, 
  Alert
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useForm, Controller } from 'react-hook-form'

import SoundIcon from '../../../shared/assets/icons/sound.svg'
import LoginIcon from '../../../shared/assets/icons/user.svg'
import ClearIcon from '../../../shared/assets/icons/cross.svg'
import LockIcon from '../../../shared/assets/icons/lock.svg'
import { useAuth } from '../model/useAuth'
import { useNavigate } from 'react-router-dom'

export interface ILoginFormInputs {
  username: string
  password: string
  remember: boolean
}

export const LoginForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<ILoginFormInputs>({
    defaultValues: {
      username: '',
      password: '',
      remember: false
    }
  })

  const [showPassword, setShowPassword] = useState(false)

  const mutation = useAuth();

  const navigate = useNavigate()

  const [toast, setToast] = useState<{
    open: boolean
    message: string
    type: 'success' | 'error'
  }>({
    open: false,
    message: '',
    type: 'error'
  })

  useEffect(() => {
    if(mutation.error) {
      showToast(mutation.error.message, 'error')
    }
  }, [mutation.error])

  useEffect(() => {
    if (mutation.isSuccess) {
      showToast('Успешный вход', 'success')
      reset()
      navigate('/products', { replace: true })
    }
  }, [mutation.isSuccess])

  const showToast = (message: string, type: 'success' | 'error' = 'error') => {
    setToast({
      open: true,
      message,
      type
    })
  }

  const onSubmit = (data: ILoginFormInputs) => {
    mutation.mutate(data)
  }

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='100vh'
      bgcolor='#F9F9F9'
      px={2}
    >
      <Paper
        elevation={6}
        sx={{
          width: '100%',
          maxWidth: 527,
          padding: '6px',
          borderRadius: '34px',
          boxShadow: '0 0 15px rgba(0,0,0,0.1)',
          boxSizing: 'border-box',
          bgColor: "#ffffff"
        }}
      >
        <Paper 
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 515,
          height: '100%',
          py: 6,
          px: { xs: 2.5, sm: 7.25},
          borderRadius: '34px',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            padding: '1px 1px 0 1px', 
            top: 0,
            left: 0,
            right: 0,
            borderRadius: 'inherit',
      
            background: `
            linear-gradient(
              to bottom,
              rgba(237,237,237,1) 20%,
              rgba(237,237,237,0) 100%
            )
          `,
      
            WebkitMask:
              'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
      
            pointerEvents: 'none',
          },
          backgroundImage: `
          linear-gradient(
            to bottom,
            rgba(35,35,35,0.03) 0%,
            rgba(35,35,35,0) 50%,
            rgba(35,35,35,0) 100%
          )
          `,
          boxSizing: 'border-box',
          boxShadow: 'none'
        }}>
        <Box textAlign='center' mb={3}>
          <img
            src={SoundIcon}
            alt='sound icon'
            style={{
              width: 52,
              height: 52
            }}
          />
          <Typography
            fontWeight='bold'
            sx={{
              mt: 4,
              fontSize: 32,
              fontFamily: 'Inter'
            }}
          >
            Добро пожаловать!
          </Typography>
          <Typography
            sx={{
              mt: 1.5,
              mb: 4,
              color: '#E0E0E0',
              fontSize: 18,
              fontFamily: 'Inter-Medium'
            }}
          >
            Пожалуйста, авторизируйтесь
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name='username'
            control={control}
            rules={{ required: 'Введите логин' }}
            render={({ field }) => (
              <>
                <InputLabel
                  shrink
                  sx={{
                    fontFamily: 'Inter-Medium',
                    fontSize: 18,
                    color: '#232323'
                  }}
                >
                  Логин
                </InputLabel>
                <TextField
                  {...field}
                  variant='outlined'
                  fullWidth
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <img
                          src={LoginIcon}
                          alt='user icon'
                          style={{
                            width: 24,
                            height: 24,
                            transform: 'scale(1.2)'
                          }}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: field.value && (
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={() => field.onChange('')}
                          edge='end'
                          sx={{
                            '&:hover': {
                              backgroundColor: 'transparent'
                            }
                          }}
                        >
                          <img
                            src={ClearIcon}
                            alt='clear icon'
                            style={{
                              width: 16,
                              height: 16
                            }}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: {
                      fontFamily: 'Inter-Medium',
                      fontSize: 18,
                      color: '#232323'
                    }
                  }}
                  sx={{
                    width: '100%',
                    boxSizing: 'border-box',
                    borderRadius: 1.5,
                    '& .MuiOutlinedInput-root': {
                      padding: '0 16px 0 16px'
                    },

                    '& .MuiOutlinedInput-input': {
                      padding: '14px 16px'
                    },

                    '& .MuiOutlinedInput-root fieldset': {
                      borderColor: '#EDEDED'
                    },
                    '&:hover .MuiOutlinedInput-root fieldset': {
                      borderColor: '#E0E0E0'
                    },
                    '& .MuiFormHelperText-root': {
                      margin: 0, 
                    },
                  }}
                />
              </>
            )}
          />

          <Controller
            name='password'
            control={control}
            rules={{ required: 'Введите пароль' }}
            render={({ field }) => (
              <>
                <InputLabel
                  shrink
                  sx={{
                    fontFamily: 'Inter-Medium',
                    fontSize: 18,
                    color: '#232323',
                    marginTop: 2
                  }}
                >
                  Пароль
                </InputLabel>
                <TextField
                  {...field}
                  type={showPassword ? 'text' : 'password'}
                  variant='outlined'
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <img
                          src={LockIcon}
                          alt='lock icon'
                          style={{
                            width: 24,
                            height: 24
                          }}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: field.value && (
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={() => setShowPassword(show => !show)}
                          edge='end'
                          sx={{
                            '&:hover': {
                              backgroundColor: 'transparent'
                            }
                          }}
                        >
                          {showPassword ? (
                            <Visibility
                              sx={{
                                color: '#cdcdcd',
                                width: 24,
                                height: 24
                              }}
                            />
                          ) : (
                            <VisibilityOff
                              sx={{
                                color: '#cdcdcd',
                                width: 24,
                                height: 24
                              }}
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: {
                      fontFamily: 'Inter-Medium',
                      fontSize: 18,
                      color: '#232323'
                    }
                  }}
                  sx={{
                    width: '100%',
                    boxSizing: 'border-box',
                    borderRadius: 1.5,
                    '& .MuiOutlinedInput-root': {
                      padding: '0 16px 0 16px'
                    },

                    '& .MuiOutlinedInput-input': {
                      padding: '14px 16px'
                    },

                    '& .MuiOutlinedInput-root fieldset': {
                      borderColor: '#EDEDED'
                    },
                    '&:hover .MuiOutlinedInput-root fieldset': {
                      borderColor: '#E0E0E0'
                    },
                    '& .MuiFormHelperText-root': {
                      margin: 0, 
                    },
                  }}
                />
              </>
            )}
          />

          <Controller
            name='remember'
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                    sx={{
                      color: '#C7C7C7',
                      '&.Mui-checked': {
                        color: '#242EDB'
                      }
                    }}
                  />
                }
                label='Запомнить данные'
                sx={{
                  my: 2.5,
                  color: '#9C9C9C',
                  fontFamily: 'Inter-Medium',
                  fontSize: 2
                }}
              />
            )}
          />

          <Button
            type='submit'
            variant='contained'
            fullWidth
            disabled={mutation.isPending}
            size='large'
            sx={{
              border: '1px solid #367AFF',
              borderRadius: '12px',
              backgroundColor: '#242EDB',
              fontFamily: 'Inter',
              fontSize: 18,
              boxShadow: 'none',
              textTransform: 'none'
            }}
          >
            Войти
          </Button>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: 2,
              mb: 4
            }}
          >
            <Box sx={{ flex: 1, height: '1px', backgroundColor: '#EDEDED' }} />

            <Typography
              sx={{
                mx: 2,
                fontSize: 16,
                color: '#EBEBEB',
                fontFamily: 'Inter-Medium'
              }}
            >
              или
            </Typography>

            <Box sx={{ flex: 1, height: '1px', backgroundColor: '#EDEDED' }} />
          </Box>

          <Box 
             textAlign='center' 
             fontSize={18} 
             color='#6C6C6C'
             fontFamily='Inter-Regular'
            >
            Нет аккаунта?{' '}
            <Link 
              href='#' 
              underline='hover' 
              fontWeight='medium'
              fontSize={18}
              fontFamily="Inter"
              color="#242EDB"
            >
              Создать
            </Link>
          </Box>
        </form>
        </Paper>
      </Paper>
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity={toast.type}
          onClose={() => setToast(prev => ({ ...prev, open: false }))}
          sx={{ width: '100%' }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

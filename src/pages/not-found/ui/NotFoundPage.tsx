import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const NotFoundPage = () => {
  const navigate = useNavigate()

  const goHome = () => {
    navigate('/')
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 2,
        backgroundColor: '#f8f8f8',
        px: 2
      }}
    >
      <Typography
        variant='h1'
        sx={{ fontSize: 96, fontWeight: 700, color: '#242424' }}
      >
        404
      </Typography>
      <Typography variant='h4' sx={{ color: '#555555' }}>
        Страница не найдена
      </Typography>
      <Typography sx={{ color: '#777777', maxWidth: 400 }}>
        Похоже, вы попали на несуществующую страницу или ссылка устарела.
      </Typography>
      <Button
        variant='contained'
        sx={{ mt: 2, backgroundColor: '#242EDB' }}
        onClick={goHome}
      >
        На главную
      </Button>
    </Box>
  )
}

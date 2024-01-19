import React, { useRef } from 'react'
import { IForgotPassword } from '../types/types'
import { toast } from 'react-toastify'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { CircularProgress } from '@mui/material'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Copyright from 'components/ui/Copyright'
import { useNavigate } from 'react-router-dom'
import { useForgotPasswordMutation } from 'api/authAPI'

function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation()
  const formRef = useRef<HTMLFormElement | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    let response

    const data = new FormData(event.currentTarget)
    const formData: IForgotPassword = {
      email: data.get('email') as string
    }

    try {
      response = await forgotPassword(formData)

      if ('error' in response) {
        toast.error(`${(response.error as any).data?.message}`)
      } else if ('data' in response) {
        toast.success(`${response.data?.message}`)
        formRef.current?.reset()
        navigate('/')
      }
    } catch (error) {
      console.error(error)
      toast.error('An error occurred.')
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {!isLoading ? (
          <>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Type your email
            </Typography>
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {!error && <CircularProgress />}
          </Box>
        )}
        <Box component='form' ref={formRef} onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoFocus
            autoComplete='email'
          />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Reset password
          </Button>
          <Grid container>
            <Grid item>
              <Link onClick={() => navigate('/registration')} variant='body2' style={{ cursor: 'pointer' }}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Copyright text='Copyright' sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}

export default ForgotPasswordPage

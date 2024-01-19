import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import Copyright from 'components/ui/Copyright'
import { ILogin } from '../types/types'
import { useLoginMutation } from 'api/authAPI'
import { CircularProgress } from '@mui/material'
import { useEffect, useRef } from 'react'
import { toast } from 'react-toastify'

export default function SignInPage() {
  const navigate = useNavigate()
  const [login, { isLoading, error }] = useLoginMutation()
  const formRef = useRef<HTMLFormElement | null>(null)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const formData: ILogin = {
      email: data.get('email') as string,
      password: data.get('password') as string
    }
    await login({ login: formData, callback: () => navigate('/home') })
    formRef.current?.reset()
  }

  useEffect(() => {
    if (error) {
      if ((error as any).data) {
        toast.error((error as any).data.message)
      } else {
        toast.error('Sign in error')
      }
    }
  }, [error])

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
        {!isLoading && !error ? (
          <>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
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
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link onClick={() => navigate('/forgot-password')} variant='body2' style={{ cursor: 'pointer' }}>
                Forgot password?
              </Link>
            </Grid>
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

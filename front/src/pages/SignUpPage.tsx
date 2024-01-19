import React, { useEffect } from 'react'
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
import { useRegistrationMutation } from 'api/authAPI'
import { IRegistration } from '../types/types'
import { CircularProgress } from '@mui/material'
import { toast } from 'react-toastify'

export default function SignUpPage() {
  const navigate = useNavigate()
  const [registration, { isLoading, error }] = useRegistrationMutation()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const formData: IRegistration = {
      name: data.get('name') as string,
      email: data.get('email') as string,
      password: data.get('password') as string
    }
    console.log(formData)
    if (formData.name === '') {
      toast.error('Name is required!')
    }else if (formData.email === '') {
      toast.error('Email is required!')
    }if (formData.password === '') {
      toast.error('Password is required!')
    }else {
      let response: { data?: { message?: string | undefined } | void; error?: any }
      response = await registration(formData)
      if (response.data) {
        toast.success(response.data.message)
        navigate('/')
      }
    }
  }

  useEffect(() => {
    if (error) {
      if ((error as any).data) {
        toast.error((error as any).data.message)
      } else {
        toast.error('Sign up error')
      }
    }
  }, [error])

  return (
    <Container component='main' maxWidth='xs'>
      {!isLoading ? (
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField autoComplete='given-name' name='name' required fullWidth id='name' label='Name' autoFocus />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth id='email' label='Email Address' name='email' autoComplete='email' />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                />
              </Grid>
            </Grid>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link onClick={() => navigate('/login')} variant='body2' style={{ cursor: 'pointer' }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {!error && <CircularProgress />}
        </Box>
      )}

      <Copyright text='Copyright' sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}

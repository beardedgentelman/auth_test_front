import React, { useRef } from 'react'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import { CircularProgress } from '@mui/material'
import Copyright from 'components/ui/Copyright'
import Container from '@mui/material/Container'
import { IResetPassword } from '../types/types'
import { useResetPasswordMutation } from 'api/authAPI'

function ResetPasswordPage() {
  const navigate = useNavigate()
  const formRef = useRef<HTMLFormElement | null>(null)
  const { id } = useParams()
  const [resetPassword, { isLoading, error }] = useResetPasswordMutation()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    let response

    const data = new FormData(event.currentTarget)
    const formData: IResetPassword = {
      password: data.get('password') as string,
      unique: id
    }

    try {
      response = await resetPassword(formData)

      if ('error' in response) {
        toast.error(`${(response.error as any).data?.message}`)
      } else if ('data' in response) {
        toast.success(`${response.data?.message}`)
        formRef.current?.reset()
        navigate('/login')
      }
    } catch (error) {
      console.error(error)
      toast.error('An error occurred.')
    }
  }

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
            Reset Password
          </Typography>
          <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='New Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                />
              </Grid>
            </Grid>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Reset
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

export default ResetPasswordPage

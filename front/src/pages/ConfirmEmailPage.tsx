import { CircularProgress, Grid } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useConfirmEmailMutation } from 'api/authAPI'
import { toast } from 'react-toastify'

function ConfirmEmailPage() {
  const params = useParams()
  const navigate = useNavigate()
  const [confirmEmail, { data }] = useConfirmEmailMutation()

  const handleConfirmEmail = async () => {
    if (params.token) {
      let response: { data?: { message?: string | undefined } | void; error?: any }
      response = await confirmEmail(params.token)
      if (response.error) {
        toast.error(response.error.data.message)
        if (response.error.status === 409) {
          navigate('/login')
        }
      } else {
        toast.success(response?.data?.message)
        navigate('/login')
      }
    }
  }

  useEffect(() => {
    handleConfirmEmail()
  }, [params, confirmEmail])

  return (
    <Grid container sx={{ width: '100vw', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress />
    </Grid>
  )
}

export default ConfirmEmailPage

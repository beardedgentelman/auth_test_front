import React, { FC } from 'react'
import { Grid, Typography } from '@mui/material'
import { purple } from '@mui/material/colors'
import { Link } from 'react-router-dom'

interface NotFoundPageProps {
  message?: string
}
const NotFoundPage: FC<NotFoundPageProps> = ({ message }) => {
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        paddingRight: '0'
      }}
    >
      <Typography variant='h1' style={{ color: 'black' }}>
        404
      </Typography>
      <Typography variant='h5' style={{ color: 'black' }}>
        {message}
      </Typography>
      <Typography variant='h5'>
        <Link to='/home' style={{ cursor: 'pointer', color: 'black' }}>
          Go to home page
        </Link>
      </Typography>
    </Grid>
  )
}
export default NotFoundPage

import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Typography } from '@mui/material'
import Button from '@mui/material/Button'

const WelcomePage = () => {
  return (
    <Grid
      container
      width={'100%'}
      height={'100vh'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'start'}
      flexDirection={'column'}
      gap={2}
      pt={10}
    >
      <Link style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexDirection: 'column' }} to={'/'}>
        <Typography variant={'h1'} color={'#000000'}>
          Welcome!
        </Typography>
      </Link>

      <Grid item display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2}>
        <Button variant={'contained'} size={'large'} href={'/registration'}>
          Registration
        </Button>
        <Button variant={'contained'} size={'large'} href={'/login'}>
          Login
        </Button>
      </Grid>
    </Grid>
  )
}

export default WelcomePage

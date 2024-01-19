import React from 'react'
import {
  Grid,
  Typography
} from '@mui/material'
import { useAppSelector } from '../hooks/reduxAppSelector'

const HomePage = () => {
  const user = useAppSelector(state => state.userReducer)

  return (
    <Grid container display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} gap={1}>
      <Typography>
        Hello, {user.name}
      </Typography>
    </Grid>
  )
}

export default HomePage

import React, { FC, useEffect, useState } from 'react'
import { Alert, CircularProgress, Grid, Popover, Stack, Typography } from '@mui/material'
import { LocationOn } from '@mui/icons-material'
import { grey } from '@mui/material/colors'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import Button from '@mui/material/Button'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../hooks/reduxAppSelector'
import { useGetUserQuery } from 'api/userAPI'
import { clearUser } from 'store/reducers/userSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const Header: FC = () => {
  const userState = useAppSelector(state => state.userReducer)
  const { data: userData, isLoading, isError, error } = useGetUserQuery()
  const [location, setLocation] = useState<string>('Loading...')
  const [country, setCountry] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const successCallback = async (position: any) => {
    try {
      const { latitude, longitude } = position.coords
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      )
      const data = await response.json()
      if (data.address) {
        setCountry(data.address.country || '')
        setCity(data.address.city || data.address.town || data.address.village || '')
        setLocation(
          `${data.address.country || ''}, ${data.address.city || data.address.town || data.address.village || ''}`
        )
      } else {
        setLocation('Location information not available')
      }
    } catch (error) {
      console.log(error)
      setLocation('Location could not be retrieved')
    }
  }

  const errorCallback = (error: any) => {
    console.log(error)
    setLocation('Location could not be retrieved')
  }

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
  }

  useEffect(() => {
    getLocation()
  }, [])

  if (isLoading) {
    return <CircularProgress />
  }

  if (isError) {
    navigate('/login')
    return <Alert severity='error'>Error loading user data!</Alert>
  }

  if (!userData) {
    return null
  }
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  const userHeader = open ? 'user-header-popover' : undefined

  const logOut = () => {
    localStorage.clear()
    dispatch(clearUser())
    navigate('/login')
  }

  useEffect(() => {
    if (userData && !userData.verification) {
      toast.error('Your account is not verified! Please, check your email.')
    }
  }, [userData])

  return (
    <>
      <Link style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }} to={'/'}>
        LOGO.
      </Link>
      <Stack spacing={0.5}>
        <Button
          sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#000' }}
          aria-describedby={userHeader}
          onClick={handleClick}
        >
          <Typography fontWeight={700} textTransform={'capitalize'} paddingLeft={0.5} sx={{ fontSize: 18 }}>
            {userState.name}
          </Typography>
          <Typography fontWeight={700} textTransform={'capitalize'} paddingLeft={0.5} sx={{ fontSize: 18 }}>
            {city}, {country}
          </Typography>
          <ExpandMoreOutlinedIcon />
        </Button>
      </Stack>
      <Popover
        id={userHeader}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Grid container sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant='body2' color='text.secondary' sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOn sx={{ color: grey[500] }} /> {location}
          </Typography>
          <Button color='primary' onClick={() => logOut()}>
            <Typography sx={{ display: 'flex', alignItems: 'center', lineHeight: 0 }}>LogOut</Typography>
            <LoginOutlinedIcon />
          </Button>
        </Grid>
      </Popover>
    </>
  )
}

export default Header

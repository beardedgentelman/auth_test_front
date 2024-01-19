import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import SignInPage from 'pages/SignInPage'
import SignUpPage from 'pages/SignUpPage'
import ForgotPasswordPage from 'pages/ForgotPasswordPage'
import ResetPasswordPage from 'pages/ResetPasswordPage'
import ConfirmEmailPage from 'pages/ConfirmEmailPage'
import NotFoundPage from 'pages/NotFoundPage'
import WelcomePage from 'pages/WelcomePage'
import HomePage from 'pages/HomePage'
import { Grid } from '@mui/material'
import Header from 'components/Header'
import { PAGE_WITH_HEADER } from './constants/constants'
import AuthRoute from './routes/AuthRoute'
import PublicRoute from './routes/PublicRoute'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const { pathname } = useLocation()

  const isShow = PAGE_WITH_HEADER.some(page => pathname.startsWith(page))

  return (
    <>
      <ToastContainer
        position='bottom-right'
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
      <Grid container paddingX={6} minHeight={'100vh'} direction='column' fontFamily={'Inter'} className='App'>
        <Grid
          container
          component={'header'}
          sx={{ display: isShow ? 'flex' : 'none', alignItems: 'center', justifyContent: 'space-between' }}
        >
          {isShow && <Header />}
        </Grid>
        <Grid container component={'main'}>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path='/' element={<WelcomePage />} />
              <Route path='/registration' element={<SignUpPage />} />
              <Route path='/login' element={<SignInPage />} />
              <Route path='/forgot-password' element={<ForgotPasswordPage />} />
              <Route path='/reset-password/:id' element={<ResetPasswordPage />} />
              <Route path='/confirm-email/:token' element={<ConfirmEmailPage />} />

              <Route path='*' element={<Navigate to='/not-found' replace />} />
              <Route path='/not-found' element={<NotFoundPage />} />
            </Route>
            <Route element={<AuthRoute />}>
              <Route path='/home' element={<HomePage />} />
            </Route>
          </Routes>
        </Grid>
      </Grid>
    </>
  )
}

export default App

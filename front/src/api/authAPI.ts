import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IAuthState, IForgotPassword, ILogin, IRegistration, IResetPassword } from '../types/types'
import { setUser } from 'store/reducers/userSlice'

const baseUrl = process.env.REACT_APP_BASE_URL

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl
  }),
  endpoints: builder => ({
    registration: builder.mutation<void, IRegistration>({
      query: body => ({
        url: 'auth/registration',
        method: 'POST',
        body: body
      }),
      transformResponse: (res: void) => res
    }),
    login: builder.mutation<IAuthState, { login: ILogin; callback: () => void }>({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body: body.login
      }),
      transformResponse: (response: IAuthState) => response,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const { token, user } = data
          localStorage.setItem('token', token)
          dispatch(setUser(user))
          arg.callback()
        } catch (error: any) {
          localStorage.clear()
        }
      }
    }),
    forgotPassword: builder.mutation<any, IForgotPassword>({
      query: body => {
        return {
          url: '/auth/forgot-password',
          method: 'POST',
          body: body
        }
      },
      transformResponse: (response: any) => response
    }),
    resetPassword: builder.mutation<any, IResetPassword>({
      query: body => {
        return {
          url: '/auth/reset-password',
          method: 'POST',
          body: body
        }
      },
      transformResponse: (response: any) => response
    }),
    confirmEmail: builder.mutation<void, string>({
      query: token => {
        return {
          url: `auth/confirm-email/${token}`,
          method: 'POST'
        }
      },
      transformResponse: (response: any) => response
    })
  })
})

export const {
  useRegistrationMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useConfirmEmailMutation
} = authAPI

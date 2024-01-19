import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { clearUser, setUser } from 'store/reducers/userSlice'
import { IUser } from '../types/types'
import { toast } from 'react-toastify'

const baseUrl = process.env.REACT_APP_BASE_URL

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: headers => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  endpoints: builder => ({
    getUser: builder.query<IUser, void>({
      query: () => 'user/get-user',
      transformResponse: (res: IUser) => res,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const user = data as IUser
          dispatch(setUser(user))
        } catch (err) {
          toast.error((err as any).error.data.message)
          localStorage.clear()
          dispatch(clearUser())
        }
      }
    })
  })
})
export const { useGetUserQuery } = userAPI

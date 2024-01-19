import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../types/types'

const initialState: IUser = {
  id: null,
  name: null,
  email: null,
  verification: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload
    },
    clearUser: state => {
      return initialState
    }
  }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer

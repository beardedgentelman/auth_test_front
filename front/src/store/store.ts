import { combineReducers, configureStore } from '@reduxjs/toolkit'

import userReducer from './reducers/userSlice'
import { authAPI } from 'api/authAPI'
import { userAPI } from 'api/userAPI'

const rootReducer = combineReducers({
  userReducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(authAPI.middleware, userAPI.middleware)
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

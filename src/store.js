// store.js
import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './slice/dataSlice'
import userReducer from './slice/UserSlice'
import authReducer from './slice/authSlice'

const store = configureStore({
  reducer: {
    data: dataReducer,
    user: userReducer,
    auth: authReducer,
  },
})

export default store

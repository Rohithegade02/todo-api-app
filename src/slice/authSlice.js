import { createSlice } from '@reduxjs/toolkit'

//initial state of auth slice
const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //on successful  login settings data and authentication to true
    login: (state, action) => {
      state.isAuthenticated = true
      state.token = action.payload.token
      state.user = action.payload.user
    },
    //logout functionality setting authentication to false
    logout: state => {
      state.isAuthenticated = false
      state.token = null
      state.user = null
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer

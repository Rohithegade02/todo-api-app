import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isLoading: false,
  error: null,
}

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: state => {
      state.isLoading = true
    },
    setData: (state, action) => {
      state.user = action.payload
      state.isLoading = false // Assuming you want to set isLoading to false after data is set
      state.error = null // Reset error when data is set successfully
    },
    setError: (state, action) => {
      state.error = action.payload
      state.isLoading = false // Set isLoading to false when error occurs
    },
  },
})

export const { setLoading, setData, setError } = UserSlice.actions
export default UserSlice.reducer

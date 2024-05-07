import { createSlice } from '@reduxjs/toolkit'

//initialState of user
const initialState = {
  user: null,
  isLoading: false,
  error: null,
}

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //loading state
    setLoading: state => {
      state.isLoading = true
    },
    //sets the data
    setData: (state, action) => {
      state.user = action.payload
      state.isLoading = false
      state.error = null
    },
    //throws error
    setError: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
  },
})

export const { setLoading, setData, setError } = UserSlice.actions
export default UserSlice.reducer

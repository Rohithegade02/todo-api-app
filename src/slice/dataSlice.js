//https://api.weatherapi.com/v1/current.json?q=Hubli&key=e5f7034fcb4548fe89f174238240605
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
//function to get the current location information
function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          let { coords } = position
          const { latitude, longitude } = coords
          resolve({ latitude, longitude })
        },
        error => {
          reject(error)
        },
      )
    }
  })
}
//Use weather api to fetch weather data based on latitude and longitude
export const fetchData = createAsyncThunk('fetchData', async () => {
  const { latitude, longitude } = await getCurrentLocation()
  const response = await axios.get(
    `https://api.weatherapi.com/v1/current.json?q=${latitude},${longitude}&key=${
      import.meta.env.VITE_API_KEY
    }`,
  )
  return response.data
})

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {
        state.status = 'loading'
        //loading state
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
        //fetchs the data
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        //throw the error
      })
  },
})

export default dataSlice.reducer

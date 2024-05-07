//https://api.weatherapi.com/v1/current.json?q=Hubli&key=e5f7034fcb4548fe89f174238240605
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the async thunk for fetching data
export const fetchData = createAsyncThunk(
  'fetchData',
  async () => {
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?q=Hubli&key=e5f7034fcb4548fe89f174238240605`);
    return response.data;
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: [],
    status: 'idle', 
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
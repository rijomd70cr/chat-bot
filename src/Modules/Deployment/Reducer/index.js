import { createSlice } from '@reduxjs/toolkit'
export const counterSlice = createSlice({
  name: 'counter',
  initialState: { 
    data: []
  },
  reducers: {
  },
  extraReducers: { }
})

export const { setClientData } = counterSlice.actions;
export default counterSlice.reducer;
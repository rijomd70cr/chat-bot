import { createSlice } from '@reduxjs/toolkit'
export const counterSlice = createSlice({
  name: 'counter',
  initialState: { 
    d: []
  },
  reducers: {

    d: () => {

    }
  
  },
  extraReducers: { }
})

export const { d } = counterSlice.actions;
export default counterSlice.reducer;
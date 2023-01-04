import { createSlice } from '@reduxjs/toolkit'
export const counterSlice = createSlice({
  name: 'common-module',
  initialState: {
  },
  reducers: {
    setStatus: (state, action) => {

    }
  },
  extraReducers: { }
})
export const { setStatus } = counterSlice.actions;
export default counterSlice.reducer;
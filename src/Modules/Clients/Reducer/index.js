import { createSlice } from '@reduxjs/toolkit'
export const counterSlice = createSlice({
  name: 'counter',
  initialState: { 
    data: []
  },
  reducers: {

    setClientData: (state, actions) => {
      if(actions.payload.id) state.data = state.data.filter(i => i.id !== actions.payload.id)
      state.data = [...state.data, actions.payload.data]
      return state;
    }  
  },
  extraReducers: { }
})

export const { setClientData } = counterSlice.actions;
export default counterSlice.reducer;
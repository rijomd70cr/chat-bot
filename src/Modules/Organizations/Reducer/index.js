import { createSlice } from '@reduxjs/toolkit'
export const slice = createSlice({
  name: 'organizations',
  initialState: { 
    organizationDropDown: []
  },
  reducers: {

    setOrganizations: (state, action) => {
      state.organizationDropDown = action.payload;
      return state;
    }
  
  },
  extraReducers: { }
})

export const { setOrganizations } = slice.actions;
export default slice.reducer;
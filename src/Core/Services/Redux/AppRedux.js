import { createSlice } from '@reduxjs/toolkit'
export const slice = createSlice({
  name: 'counter',
  initialState: { 
    notification: {
        open: false,
        message: '',
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        }
    },
    headerSearchValue: "",
    headerFilter: false
  },
  reducers: {
    appNotification: (state, action) => {

        state.notification = {
            ...state.notification,
            open: action.payload.open,
            message: action.payload.message,
        };

        return state;
    },
    headerSearch: (state, action) => {
      state.headerSearchValue = action.payload
      return state;
    },
    openHeaderFilter: (state, action) => {
      state.headerFilter = action.payload;
      return state;
    }
  },
  extraReducers: { }
})
export const { appNotification, headerSearch, openHeaderFilter } = slice.actions;
export default slice.reducer;
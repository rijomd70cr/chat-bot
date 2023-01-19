import { createSlice } from "@reduxjs/toolkit";
export const slice = createSlice({
  name: "data-table",
  initialState: {},
  reducers: {
    setTable: (state, actions) => {
      console.log(actions.payload, "clients");
      state[actions.payload.module] = actions.payload.data;
      return state;
    },
  },
  extraReducers: {},
});

export const { setTable } = slice.actions;
export default slice.reducer;

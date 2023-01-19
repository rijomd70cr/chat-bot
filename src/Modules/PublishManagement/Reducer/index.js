import { createSlice } from "@reduxjs/toolkit";
export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    data: [],
  },
  reducers: {
    setPublishData: (state, actions) => {
      if (actions.payload._id)
        state.data = state.data.filter((i) => i._id !== actions.payload._id);
      state.data = [...state.data, actions.payload.data];
      return state;
    },
  },
  extraReducers: {},
});

export const { setPublishData } = counterSlice.actions;
export default counterSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 12,
};

const sampleSlice = createSlice({
  name: "sample",
  initialState,
  reducers: {
    add: (state) => {
      state.count += 1;
    },
  },
});

export const { add } = sampleSlice.actions;
export default sampleSlice.reducer;

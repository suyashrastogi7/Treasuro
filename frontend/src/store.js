import { configureStore } from "@reduxjs/toolkit";

import sampleReducer from "./features/sampleSlice";

const store = configureStore({
  reducer: {
    sample: sampleReducer,
  },
});

export default store;

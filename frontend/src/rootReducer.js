import { combineReducers } from "@reduxjs/toolkit";

import { sampleReducer } from "./features/sampleSlice";
import { signinReducer } from "./features/loginSlice";

const rootReducer = combineReducers({
    sample: sampleReducer,
    signin: signinReducer,
});

export default rootReducer;

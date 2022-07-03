import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getQuestion, postAnswer } from "../api/questionAPI";

const initialState = {
    level: 0,
    question: "",
    success: false,
};

export const question = createAsyncThunk("question/get", getQuestion);
export const answer = createAsyncThunk("answer/post", postAnswer);

const questionSlice = createSlice({
    name: "question",
    initialState,
    reducers: {},
    extraReducers: {
        [question.pending]: startLoading,
        [question.fulfilled]: (state, { payload }) => {
            Object.assign(state, {
                ...initialState,
                loading: false,
                question: payload.question,
                level: payload.level,
                success: false,
            });
        },
        [question.rejected]: receiveError,

        [answer.pending]: startLoading,
        [answer.fulfilled]: (state, { payload }) => {
            Object.assign(state, {
                ...initialState,
                loading: false,
                success: payload.success,
            });
        },
        [answer.rejected]: receiveError,
    },
});

function startLoading(state) {
    Object.assign(state, {
        loading: true,
        error: null,
    });
}

function receiveError(state, action) {
    Object.assign(state, {
        loading: false,
        error: action.error,
    });
}

export const selectQuestion = (state) => state.question;

export const questionReducer = questionSlice.reducer;

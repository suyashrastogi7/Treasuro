import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            active: false,
            image: null,
            level: 1,
            name: null,
            phoneno: null,
            score: 0,
            rollno: null,
            email: null,
            tickets: [],
            username: null,
            verified: false,
            attempts: 0
        },
    },
    reducers: {
        setUser: (state, {payload}) => {
            state.user = payload
        },
        removeUser: (state) => {
            state.user = {
                active: false,
                image: null,
                level: 1,
                name: null,
                phoneno: null,
                score: 0,
                rollno: null,
                email: null,
                tickets: [],
                username: null,
                verified: false,
                attempts: 0
            }
        }
    },
});

export const userActions = UserSlice.actions;

export default UserSlice;

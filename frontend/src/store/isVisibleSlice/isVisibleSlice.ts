import { createSlice } from "@reduxjs/toolkit";

interface IsVisibleType {
    isAuthOpen: boolean;
}

const initialState: IsVisibleType = {
    isAuthOpen: false
};

const isVisibleUI = createSlice({
    name: "isAuthOpen",
    initialState,
    reducers: {
        setIsAuthOpen: (state, action) => {
            state.isAuthOpen = action.payload;
        },
    },
});


export const { setIsAuthOpen } = isVisibleUI.actions;
export default isVisibleUI.reducer;

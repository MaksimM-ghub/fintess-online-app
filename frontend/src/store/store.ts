import { configureStore } from "@reduxjs/toolkit";
import purposeCalorieSlice from "./purposeCalorie/purposeCalorieSlice"
import isVisibleUI from "./isVisibleSlice/isVisibleSlice"

export const store = configureStore({
    reducer: {
        isVisible: isVisibleUI,
        purposeCalorie: purposeCalorieSlice
    }
})

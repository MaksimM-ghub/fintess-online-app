import { createSlice } from "@reduxjs/toolkit";

export interface initialStateType {
    calorie: number,
    protein: number;
    fats: number;
    carbohydrates: number;
}

const initialState: initialStateType = {
    calorie: 0,
    protein: 0,
    fats: 0,
    carbohydrates: 0
}

const purposeCalorieSlice = createSlice({
    name: "purposeCalories",
    initialState,
    reducers: {
        setCalorie(state, action) {
            state.calorie = action.payload
        },

        setPFC(state, action) {
            state.protein = action.payload.protein,
            state.fats = action.payload.fats,
            state.carbohydrates = action.payload.carbohydrates
        }
    }
})

export const{ setCalorie, setPFC } = purposeCalorieSlice.actions
export default purposeCalorieSlice.reducer
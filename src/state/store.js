import { configureStore } from "@reduxjs/toolkit"
import inputReducer from "./input/inputSlice"

export const store = configureStore({
    reducer: {
        input: inputReducer
    }
})
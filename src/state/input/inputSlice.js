import { createSlice } from "@reduxjs/toolkit";

const inputSlice = createSlice({
    name: "input",
    initialState: {
        city: "",
        lat: "",
        lon: ""
    },
    reducers: {
        changeCity:(state,action) => {
            state.city = action.payload
        },
        changeLat:(state,action) => {
            state.lat = action.payload
        },
        changeLon:(state,action) => {
            state.lon = action.payload
        }
    }
})

export const {changeCity, changeLat, changeLon} = inputSlice.actions
export default inputSlice.reducer
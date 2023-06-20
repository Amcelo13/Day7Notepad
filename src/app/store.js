import { configureStore } from "@reduxjs/toolkit";
import noteReducer from './features/noteSlice' //importing slice 


const store = configureStore({
    reducer:{
        notes: noteReducer,
    },
})
export default store
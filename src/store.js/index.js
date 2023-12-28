import { configureStore } from "@reduxjs/toolkit";
import userSlice from '../feature/createSlice'


export const store = configureStore({
  reducer:{
    app: userSlice
  }
})


import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./user/userSlice"
import {useDispatch} from "react-redux"
import cartSlice from "./cart/cartSlice"
export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export type RootState = ReturnType<typeof store.getState>

import {PayloadAction, createSlice} from "@reduxjs/toolkit"
import {userData} from "../../interface/allinterface"
import {toast} from "sonner"

interface inititalState {
  userData: userData | null
}

const storedUserData = (localStorage.getItem("user") as string) || "{}"

const initialState: inititalState = JSON.parse(storedUserData) || {
  userData: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, {payload}: PayloadAction<userData>) => {
      state.userData = payload
      localStorage.setItem("user", JSON.stringify(state))
    },
    logout: (state) => {
      state.userData = null
      localStorage.removeItem("user")
      toast.success("Logout successfully")
    },
  },
})

export const {setUser, logout} = userSlice.actions

export default userSlice.reducer

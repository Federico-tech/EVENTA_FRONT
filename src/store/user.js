import {createSlice} from '@reduxjs/toolkit'
import base64 from "base-64";
import axios from "axios";
import {store} from "./index";
import {noAuthAxios} from "../utils/core/axios";

const initialState = {
  userInfo: {},
  token: null,
}

export const loginUser = async  (email, password) => {
  try {
    const auth = base64.encode(`${email.toLowerCase()}:${password}`);
    const { data } = await noAuthAxios.post(`auth/login`, undefined, {
      headers: {
        authorization: `Basic ${auth}`,
      },
    })
    store.dispatch(setUserInfo(data))
  } catch (e) {
    console.log({e})
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload.user
      state.token = action.payload.token
    },
    logoutUserSlice: () => initialState
  },
})

export const { setUserInfo, logoutUserSlice } = userSlice.actions


export const selectUser = (state) => state.user?.userInfo
export const selectUserRole = (state) => state.user?.userInfo?.role || 'user'
export const selectToken = (state) => state.user?.token
export const selectIsAuthenticated = (state) => !!state.user?.token

export default userSlice.reducer;

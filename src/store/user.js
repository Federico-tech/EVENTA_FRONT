import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {},
  token: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload.user;
      state.token = action.payload.token;
    },
    logoutUserSlice: () => initialState,
  },
});

export const { setUserInfo, logoutUserSlice } = userSlice.actions;

export const selectUser = (state) => state.user?.userInfo;
export const selectUserId = (state) => state.user?.userInfo?._id;
export const selectUserRole = (state) => state.user?.userInfo?.role || 'user';
export const selectToken = (state) => state.user?.token;
export const selectIsAuthenticated = (state) => !!state.user?.token;

export default userSlice.reducer;

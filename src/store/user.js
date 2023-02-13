import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {},
  userSelected: {},
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
    setUserSelected: (state, action) => {
      state.userSelected = action.payload;
    },
    updateUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    logoutUserSlice: () => initialState,
  },
});

export const { setUserInfo, setUserSelected, logoutUserSlice, updateUserInfo } = userSlice.actions;

export const selectCurrentUser = (state) => state.user?.userInfo;
export const selectSelectedUser = (state) => state.user?.userSelected;
export const selectSelectedUserId = (state) => state.user?.userSelected?._id;
export const selectCurrentUserId = (state) => state.user?.userInfo?._id;
export const selectCurrentUserRole = (state) => state.user?.userInfo?.role || 'user';
export const selectToken = (state) => state.user?.token;
export const selectIsAuthenticated = (state) => !!state.user?.token;

export default userSlice.reducer;

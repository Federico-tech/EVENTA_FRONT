import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  unReadNotifications: undefined,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setUnreadNotifications: (state, action) => {
      state.unReadNotifications = action.payload;
    },
  },
});

export const { setUnreadNotifications } = notificationSlice.actions;

export const selectNotificationsRead = (state) => state?.notification?.unReadNotifications || 0;

export default notificationSlice.reducer;

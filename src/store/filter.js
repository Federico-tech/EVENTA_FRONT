import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchFilter: undefined,
  dateFilter: undefined,
  mapFilter: undefined,
  notificationFilter: undefined,
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchFilter: (state, action) => {
      state.searchFilter = action.payload;
    },
    setDateFilter: (state, action) => {
      state.dateFilter = action.payload;
    },
    setMapFilter: (state, action) => {
      state.mapFilter = action.payload;
    },
  },
});

export const { setSearchFilter, setDateFilter, setMapFilter } = filterSlice.actions;

export const selectSearchFilter = (state) => state.filters?.searchFilter || undefined;
export const selectDateFilter = (state) => state.filters?.dateFilter || undefined || 'upcoming';
export const selectMapFilter = (state) => state.filters?.mapFilter || undefined || 'events';
export const selectNotificationFilter = (state) => state.filters?.notificationFilter || undefined || 'events';

export default filterSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchFilter: undefined,
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchFilter: (state, action) => {
      state.searchFilter = action.payload;
    },
  },
});

export const { setSearchFilter } = filterSlice.actions;

export const selectSearchFilter = (state) => state.filters?.searchFilter || undefined;

export default filterSlice.reducer;

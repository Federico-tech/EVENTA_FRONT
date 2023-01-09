import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
  eventSelected: {},
};

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
  },
});

export const { setEvents } = eventSlice.actions;

export const selectEvents = (state) => state.event?.events;

export default eventSlice.reducer;

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
    setSelectedEvent: (state, action) => {
      state.eventSelected = action.payload;
    },
  },
});

export const { setEvents, setSelectedEvent } = eventSlice.actions;

export const selectEvents = (state) => state.event?.events;
export const selectSelectedEvent = (state) => state.event?.eventSelected;
export const selectSelectedEventId = (state) => state.event?.eventSelected._id;

export default eventSlice.reducer;

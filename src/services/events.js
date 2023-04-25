import { DateTime } from 'luxon';

import { mainAxios } from '../core/axios';
import { store } from '../store';
import { selectSelectedEventId, setEvents, setSelectedEvent } from '../store/event';

export const createEvent = async (eventData) => {
  try {
    console.log({ eventData });
    const { data: createdEvent } = await mainAxios.post('events', eventData);
    console.debug({ createdEvent });
    return await updateEventImage(eventData.file, createdEvent._id, true);
  } catch (e) {
    console.log({ errorCreateEvent: e });
  }
};

export const updateEventImage = async (image, eventId, deleteOnUploadFailed) => {
  const formData = new FormData();
  formData.append('file', {
    uri: image,
    name: 'image.png',
    type: 'image/png',
  });

  console.debug({ formData });
  try {
    const { data } = await mainAxios.put(`events/${eventId}/coverImage`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    console.debug('Data', { data });
    return data;
  } catch (e) {
    console.debug({ errorImageEvent: e });
    deleteOnUploadFailed && (await mainAxios.delete(`events/${eventId}`));
    return Promise.reject(e);
  }
};

export const getEvents = async () => {
  try {
    const { data } = await mainAxios.get(`events`);
    store.dispatch(setEvents(data));
  } catch (e) {
    console.log({ e });
  }
};

export const getOrganiserEvents = async (organiserId) => {
  try {
    const params = { organiserId };
    const { data } = await mainAxios.get(`events`, { params });
    console.log(data);
    store.dispatch(setEvents(data));
  } catch (e) {
    console.log({ e });
  }
};

export const getRefreshedEvent = async (event) => {
  try {
    const { data } = await mainAxios.get(`events/${event?._id}`);
    console.log('EventSelected', data);
    store.dispatch(setSelectedEvent(data.event));
    return { data };
  } catch (e) {
    console.log({ errorGetPartecipants: e });
  }
};

export const getRefreshedEventbyId = async (eventId) => {
  try {
    const { data } = await mainAxios.get(`events/${eventId}`);
    console.log('EventSelected', data);
    store.dispatch(setSelectedEvent(data.event));
  } catch (e) {
    console.log({ errorGetPartecipants: e });
  }
};

export const updateEvent = async (event) => {
  console.log('Event', event);
  const state = store.getState();
  const eventId = selectSelectedEventId(state);
  console.log(eventId);
  try {
    const { data: updatedEvent } = await mainAxios.put(`events/${eventId}`, event);
    store.dispatch(setSelectedEvent(updatedEvent));
    console.debug({ updatedEvent });
  } catch (e) {
    console.log({ errorUpdatingEvent: e });
  }
};

export const getEventById = async (eventId) => {
  try {
    const { data: event } = await mainAxios.get(`events/${eventId}`);
    console.log({ event });
    return event;
  } catch (e) {
    console.log({ getEventByIdError: e });
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const { data } = await mainAxios.delete(`events/${eventId}`);
    console.log(data);
  } catch (e) {
    console.log({ errorDeletingEvents: e });
  }
};

export const getPopularEvents = async (organiserId, { queryParams = {} }) => {
  try {
    const params = { organiserId, ...queryParams, popular: true };
    console.log(params);
    const { data: popularEvents } = await mainAxios.get('events', { params });
    return popularEvents.data;
  } catch (e) {
    console.log({ errorGettingPopularEvents: e });
  }
};

export const getMostPopularEvent = async () => {
  const today = DateTime.now();
  try {
    const params = {
      popular: true,
      limit: 1,
      'date.$gte': today,
    };
    console.log(params);
    const { data: popularEvents } = await mainAxios.get('events/home', { params });
    return popularEvents.data;
  } catch (e) {
    console.log({ errorGettingPopularEvents: e });
  }
};

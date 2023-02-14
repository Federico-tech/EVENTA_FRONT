import { mainAxios } from '../core/axios';
import { store } from '../store';
import { setEvents, setSelectedEvent } from '../store/event';

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
  console.log(event);
  try {
    const { data } = await mainAxios.get(`events/${event?._id}`);
    console.log('EventSelected', data);
    store.dispatch(setSelectedEvent(data.event));
  } catch (e) {
    console.log({ errorGetPartecipants: e });
  }
};

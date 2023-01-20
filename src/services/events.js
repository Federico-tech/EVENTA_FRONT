import { store } from '../store';
import { setEvents } from '../store/event';
import { mainAxios } from '../utils/core/axios';

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

export const getEvents = async () => {
  try {
    const events = await mainAxios.get(`events`);
    store.dispatch(setEvents(events))
  } catch (e) {
    console.log({e});
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

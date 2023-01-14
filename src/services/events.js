import { store } from '../store';
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
    const response = await mainAxios.get('events');
    store.dispatch();
    console.log(response);
  } catch (e) {
    console.log({ e });
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
    const { data } = await mainAxios.put(`events/${eventId}/coverImage`, formData, { headers: { 'content-type': 'multipart/form-data' } });
    console.debug({ data });
    return data;
  } catch (e) {
    console.debug({ errorIMageEvent: e });
    deleteOnUploadFailed && (await mainAxios.delete(`events/${eventId}`));
    return Promise.reject(e);
  }
};

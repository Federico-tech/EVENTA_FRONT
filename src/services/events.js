import { mainAxios } from '../utils/core/axios';

export const createEvent = async (eventData) => {
  try {
    const { data: createdEvent } = await mainAxios.post('events', eventData);
    console.log({ createdEvent });
    return createdEvent;
  } catch (e) {
    console.log({ errorCreateEvent: e });
  }
};

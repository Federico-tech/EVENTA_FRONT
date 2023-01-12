import { store } from '../store';
import { mainAxios } from '../utils/core/axios';

export const createEvent = async (eventData) => {
  try {
    console.log(eventData)
    const { data: createdEvent } = await mainAxios.post('events', eventData);
    console.log('createdEvent', { createdEvent });
    return createdEvent;
  } catch (e) {
    console.log({ errorCreateEvent: e });
  }
};

export const getEvents = async () => {
  try {
    const response = await mainAxios.get('events')
    store.dispatch()
    console.log(response)
  } catch (e) {
    console.log({e})
  }
}


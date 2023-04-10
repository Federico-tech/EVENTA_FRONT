import { mainAxios } from '../core/axios';
import { store } from '../store';
import { selectSelectedEventId } from '../store/event';
import { selectCurrentUserId } from '../store/user';

export const partecipate = async () => {
  const state = store.getState();
  const eventId = selectSelectedEventId(state);
  try {
    const { data } = await mainAxios.post(`events/${eventId}/participate`);
    console.log(data);
  } catch (e) {
    console.log({ errorPartecipate: e });
  }
};

export const unpartecipate = async () => {
  const state = store.getState();
  const eventId = selectSelectedEventId(state);
  try {
    const { data } = await mainAxios.delete(`events/${eventId}/unparticipate`);
    console.log(data);
  } catch (e) {
    console.log({ errorPartecipate: e });
  }
};

export const checkPartecipating = async () => {
  const state = store.getState();
  const eventId = selectSelectedEventId(state);
  const userId = selectCurrentUserId(state);
  try {
    const params = { eventId, userId };
    const { data } = await mainAxios.get('participants', { params });
    return data.totalData === 1;
  } catch (e) {
    console.log({ errorCheckPartecipating: e });
  }
};

export const getEventParticipants = async (eventId, { queryParams = {} }) => {
  try {
    const params = { eventId, ...queryParams };
    const { data: participants } = await mainAxios.get(`participants`, { params });
    return participants.data;
  } catch (e) {
    console.log({ errorGetParticipants: e });
  }
};

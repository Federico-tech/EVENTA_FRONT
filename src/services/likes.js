import { mainAxios } from '../core/axios';

export const like = (eventId) => {
  try {
    const { data } = mainAxios.post(`events/${eventId}/like`);
    console.log(data);
  } catch (e) {
    console.log({ errorLike: e });
  }
};

export const unLike = (eventId) => {
  try {
    const { data } = mainAxios.delete(`events/${eventId}/unlike`);
    console.log(data);
  } catch (e) {
    console.log({ errorLike: e });
  }
};

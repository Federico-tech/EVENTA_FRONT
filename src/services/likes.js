import { mainAxios } from '../core/axios';

export const like = async (eventId) => {
  try {
    const { data } = await mainAxios.post(`events/${eventId}/like`);
    console.log(data);
  } catch (e) {
    console.log({ errorLike: e });
  }
};

export const unLike = async (eventId) => {
  try {
    const { data } = await mainAxios.delete(`events/${eventId}/unlike`);
    console.log(data);
  } catch (e) {
    console.log({ errorLike: e });
  }
};

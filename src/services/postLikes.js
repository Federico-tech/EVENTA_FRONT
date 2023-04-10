import { mainAxios } from '../core/axios';

export const postLike = async (postId) => {
  try {
    const { data } = await mainAxios.post(`posts/${postId}/like`);
    console.log(data);
  } catch (e) {
    console.log({ errorLike: e });
  }
};

export const postUnlike = async (postId) => {
  try {
    const { data } = await mainAxios.delete(`posts/${postId}/unlike`);
    console.log(data);
  } catch (e) {
    console.log({ errorLike: e });
  }
};

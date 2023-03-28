import { mainAxios } from '../core/axios';

export const postLike = (postId) => {
  try {
    const { data } = mainAxios.post(`posts/${postId}/like`);
    console.log(data);
  } catch (e) {
    console.log({ errorLike: e });
  }
};

export const postUnlike = (postId) => {
  try {
    const { data } = mainAxios.delete(`posts/${postId}/unlike`);
    console.log(data);
  } catch (e) {
    console.log({ errorLike: e });
  }
};
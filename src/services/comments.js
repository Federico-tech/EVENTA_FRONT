import { mainAxios } from '../core/axios';

export const createComment = async (data) => {
  console.debug({ comment: data });
  try {
    const { data: commentCreated } = await mainAxios.post('comments', data);
    console.log({ commentCreated });
  } catch (e) {
    console.log({ errorCreateComment: { e } });
  }
};

import { mainAxios } from '../core/axios';

export const createComment = async (data) => {
  try {
    const { data: commentCreated } = await mainAxios.post(`comments`, data);
    console.log({ commentCreated });
    return commentCreated
  } catch (e) {
    console.log({ errorCreateComment: { e } });
  }
};

export const deleteComment = async (postId) => {
  try {
    const { data: commentDeleted } = await mainAxios.delete(`comments/${postId}`);
    console.log({ commentDeleted });
  } catch (e) {
    console.log({ errorDeletingComment: { e } });
  }
};

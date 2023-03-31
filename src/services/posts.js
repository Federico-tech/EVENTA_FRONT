import { mainAxios } from '../core/axios';

export const createPost = async (postData) => {
  try {
    console.log({ postData });
    const { data: createdPost } = await mainAxios.post('posts', postData);
    console.debug({ createdPost });
    return await updatePostImage(postData.file, createdPost._id, true);
  } catch (e) {
    console.log({ errorCreateEvent: e });
  }
};

export const updatePostImage = async (image, postId, deleteOnUploadFailed) => {
  const formData = new FormData();
  formData.append('file', {
    uri: image,
    name: 'image.png',
    type: 'image/png',
  });

  console.debug({ formData });
  try {
    const { data } = await mainAxios.put(`posts/${postId}/postImage`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    console.debug('Data', { data });
    return data;
  } catch (e) {
    console.debug({ errorImageEvent: e });
    deleteOnUploadFailed && (await mainAxios.delete(`posts/${postId}`));
    return Promise.reject(e);
  }
};
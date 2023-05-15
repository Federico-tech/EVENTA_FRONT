import { mainAxios } from '../core/axios';

export const createStory = async (storyData) => {
  try {
    console.log({ storyData });
    const { data: createdStory } = await mainAxios.post('stories', storyData);
    console.debug({ createdStory });
    return await updateStoryImage(storyData.contentImage, createdStory._id, true);
  } catch (e) {
    console.log({ errorCreateStory: e });
  }
};

export const updateStoryImage = async (image, storyId, deleteOnUploadFailed) => {
  const formData = new FormData();
  formData.append('file', {
    uri: image,
    name: 'image.png',
    type: 'image/png',
  });

  console.debug({ formData });
  try {
    const { data } = await mainAxios.put(`stories/${storyId}/contentImage`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    console.debug('Data', { data });
    return data;
  } catch (e) {
    console.debug({ errorImageStory: e });
    deleteOnUploadFailed && (await mainAxios.delete(`stories/${storyId}`));
    return Promise.reject(e);
  }
};

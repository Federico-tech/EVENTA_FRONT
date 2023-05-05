import { mainAxios } from '../core/axios';

export const block = async (data) => {
  console.debug({ block: data });
  try {
    const { date: blockCreated } = await mainAxios.post('blocks', data);
    console.log({ blockCreated });
  } catch (e) {
    console.log({ errorCreateBlock: { e } });
  }
};

export const Unblock = async (userId) => {
  console.debug({ userId });
  try {
    const { date: blockDeleted } = await mainAxios.delete(`blocks/${userId}`);
    console.log({ blockDeleted });
  } catch (e) {
    console.log({ errorDeletingBlock: { e } });
  }
};

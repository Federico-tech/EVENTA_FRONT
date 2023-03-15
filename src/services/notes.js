import { mainAxios } from '../core/axios';

export const createNote = async (data) => {
  console.debug({ note: data });
  try {
    const { date: noteCreated } = await mainAxios.post('notes', data);
    console.log({ noteCreated });
  } catch (e) {
    console.log({ errorCreateNote: { e } });
  }
};

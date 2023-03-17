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

export const fire = async (noteId) => {
  try {
    const { data: fire } = await mainAxios.post(`notes/${noteId}/fire`);
    console.log({ fire });
  } catch (e) {
    console.log({ fireError: e });
  }
};

export const unfire = async (noteId) => {
  try {
    const { data: unFire } = await mainAxios.delete(`notes/${noteId}/unfire`);
    console.log({ unFire });
  } catch (e) {
    console.log({ unFireError: e });
  }
};

import { mainAxios } from '../core/axios';
import { DateTime } from 'luxon';

export const createNote = async (data) => {
  console.debug({ note: data });
  try {
    const { date: noteCreated } = await mainAxios.post('notes', data);
    console.log({ noteCreated });
  } catch (e) {
    console.log({ errorCreateNote: { e } });
  }
};

export const getUserNotes = async () => {
  const params = {'date.$gte': '2023-03-25T03:25:15.085'}
  try {
    const { data: userNotes } = await mainAxios.get('notes/userNotes', {params})
    console.log({userNotes})
    return userNotes
  } catch (e){
    console.log({ errorGettinUserNotes: e})
  }
}

export const deleteNote = async (noteId) => {
  try {
    const { date: noteCreated } = await mainAxios.delete(`notes/${noteId}`);
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

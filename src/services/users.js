import base64 from 'base-64';

import { mainAxios, noAuthAxios } from '../core/axios';
import { store } from '../store';
import { selectCurrentUserId, setUserInfo, setUserSelected, updateUserInfo } from '../store/user';

export const loginUser = async (email, password) => {
  try {
    const auth = base64.encode(`${email.toLowerCase()}:${password}`);
    const { data } = await noAuthAxios.post(`auth/login`, undefined, {
      headers: {
        authorization: `Basic ${auth}`,
      },
    });
    store.dispatch(setUserInfo(data));
  } catch (e) {
    console.log({ e });
    throw new Error('Wrong Username or password');
  }
};

export const organiserSignUp = async (data) => {
  try {
    const { data: createdUser } = await noAuthAxios.post(`auth/register`, data);
    console.log({ createdUser });
    return createdUser;
  } catch (e) {
    console.log({ erorrCreatedUser: e });
  }
};

export const userUpdate = async (data) => {
  console.debug({ updateUserData: data });
  try {
    //await updateUserImage(data.file, userId);
    const { data: updatedUser } = await mainAxios.put(`users/me`, data);
    store.dispatch(updateUserInfo(updatedUser));
    console.log({ updatedUser });
  } catch (e) {
    console.log({ ErrorUpdatingUser: e });
  }
};

export const updateUserImage = async (file) => {
  console.log(file);
  const state = store.getState();
  const userId = selectCurrentUserId(state);

  const formData = new FormData();
  formData.append('file', {
    uri: file,
    name: 'image.png',
    type: 'image/png',
  });

  console.debug({ formData });
  try {
    const { data } = await mainAxios.put(`users/${userId}/profilePic`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    console.debug('userWithImageUpdated', { data });
    return data;
  } catch (e) {
    console.debug({ errorProfilePic: e });
  }
};

export const refreshSelectedUser = async (user) => {
  try {
    const { data } = await mainAxios.get(`users/${user._id}`);
    console.debug({ refreshSelectedUser: data });
    store.dispatch(setUserSelected(data));
  } catch (e) {
    console.log({ e });
  }
};

export const refreschCurrentUser = async (user) => {
  try {
    const { data } = await mainAxios.get(`users/${user._id}`);
    console.debug({ refreschCurrentUser: data });
    store.dispatch(updateUserInfo(data));
  } catch (e) {
    console.log({ e });
  }
};

export const getMe = async (data) => {
  try {
    const { data: updatedUser } = await mainAxios.get(`users/me`);
    store.dispatch(updateUserInfo(updatedUser));
    console.log({ updatedUser });
  } catch (e) {
    console.log({ ErrorGetMe: e });
  }
};

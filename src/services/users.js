import base64 from 'base-64';

import { store } from '../store';
import { setUserInfo } from '../store/user';
import { noAuthAxios } from '../utils/core/axios';

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

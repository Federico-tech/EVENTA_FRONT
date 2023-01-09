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
    const { data: createdOrganiser } = await noAuthAxios.post('/auth/register', data);
    console.log({ createdOrganiser });
    return createdOrganiser;
  } catch (e) {
    console.log({ errorCreateOrganiser: e });
  }
};

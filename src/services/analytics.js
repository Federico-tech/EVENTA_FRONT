import { mainAxios } from '../core/axios';

export const getAnalytics = async () => {
  try {
    const { data: analytics } = await mainAxios.get('users/analytics');
    return analytics;
  } catch (e) {
    console.log({ errorGettingAnalytics: e });
  }
};

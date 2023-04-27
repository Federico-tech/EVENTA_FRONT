import { mainAxios } from '../core/axios';

export const getNotification = async () => {
  try {
    const { data: notifications } = await mainAxios.get('notifications/me');
    return notifications;
  } catch (e) {
    console.log({ errorGettingNotifications: e });
  }
};

export const checkReadNotifications = async () => {
  try {
    const { data } = await mainAxios.get('notifications/check');
    return data;
  } catch (e) {
    console.log({ errorCheckingReadNotifications: e });
  }
};

export const setReadNotifications = async () => {
  try {
    const { data } = await mainAxios.put('notifications/setRead');
    console.log(data);
  } catch (e) {
    console.log({ errorSettingReadNotifications: e });
  }
};

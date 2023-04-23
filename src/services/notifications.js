import { mainAxios } from "../core/axios";

export const getNotification = async () => {
  try {
    const { data: notifications } = await mainAxios.get('notifications/me');
    return notifications;
  } catch (e) {
    console.log({ errorGettingPopularEvents: e });
  }
}
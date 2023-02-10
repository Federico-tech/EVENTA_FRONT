import { mainAxios } from '../core/axios';

export const followUser = async (userId) => {
  try {
    const { data } = await mainAxios.post(`users/${userId}/follow`);
    console.log(data);
  } catch (e) {
    console.log({ errorFollowing: e });
  }
};

export const getFollowers = async (userId) => {
  try {
    const followedId = userId;
    const params = followedId;
    const { data: followers } = await mainAxios.get(`follow`, { params });
    return followers;
  } catch (e) {
    console.log({ errorGetFolloers: e });
  }
};

export const getFollowing = async (userId) => {
  try {
    const followerId = userId;
    const params = { followerId };
    const { data: following } = await mainAxios.get(`follow`, { params });
    return following;
  } catch (e) {
    console.log({ errorGetFollwing: e });
  }
};

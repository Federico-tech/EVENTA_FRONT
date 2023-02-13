import { mainAxios } from '../core/axios';
import { store } from '../store';
import { selectSelectedUser } from '../store/user';

export const followUser = async (userId) => {
  try {
    const { data } = await mainAxios.post(`users/${userId}/follow`);
    console.log(data);
  } catch (e) {
    console.log({ errorFollowing: e });
  }
};

export const checkFollowing = async (myId, userId) => {
  try {
    const followerId = myId;
    const followedId = userId;
    const params = { followedId, followerId };
    const { data: checkFollow } = await mainAxios.get(`follow`, { params });
    return checkFollow.totalData === 1;
  } catch (e) {
    console.log({ errorCheckFollow: e });
  }
};

export const follow = async () => {
  const state = store.getState();
  const userSelected = selectSelectedUser(state);
  console.log(userSelected);
  try {
    const { data: follow } = await mainAxios.post(`users/${userSelected?._id}/follow`);
    console.log(follow);
  } catch (e) {
    console.log({ ErrorFollow: e });
  }
};

export const unFollow = async () => {
  const state = store.getState();
  const userSelected = selectSelectedUser(state);
  try {
    const { data: unfollow } = await mainAxios.delete(`users/${userSelected?._id}/unfollow`);
    console.log(unfollow);
  } catch (e) {
    console.log({ errorUnfollow: e });
  }
};

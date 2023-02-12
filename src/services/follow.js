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

// export const getFollowers = async (userId) => {
//   try {
//     const followedId = userId;
//     const params = { followedId };
//     const { data: followers } = await mainAxios.get(`follow`, { params });
//     return followers;
//   } catch (e) {
//     console.log({ errorGetFolloers: e });
//   }
// };

// export const getFollowing = async (userId) => {
//   try {
//     const followerId = userId;
//     const params = { followerId };
//     const { data: following } = await mainAxios.get(`follow`, { params });
//     return following;
//   } catch (e) {
//     console.log({ errorGetFollwing: e });
//   }
// };

export const checkFollowing = async (myId, userId) => {
  try {
    const followerId = myId;
    console.log(myId);
    const followedId = userId;
    console.log(userId);
    const params = { followedId, followerId };
    const { data: checkFollow } = await mainAxios.get(`follow`, { params });
    return await checkFollow.totalData === 1;
  } catch (e) {
    console.log({ errorCheckFollow: e });
  }
};

export const follow = async () => {
  const state = store.getState()
  const userSelected = selectSelectedUser(state)
  console.log(userSelected)
  try {
    const { data: follow } = await mainAxios.post(`users/${userSelected?._id}/follow`);
    console.log(follow);
  } catch (e) {
    console.log({ ErrorFollow: e });
  }
};

export const unFollow = async () => {
  const state = store.getState()
  const userSelected = selectSelectedUser(state)
  try {
    const { data: unfollow } = await mainAxios.delete(`users/${userSelected?._id}/unfollow`);
    console.log(unfollow);
  } catch (e) {
    console.log({ errorUnfollow: e });
  }
};

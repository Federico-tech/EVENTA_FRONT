import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

import { checkFollowing, follow, unFollow } from '../services/follow';
import { selectCurrentUserId, selectSelectedUserId } from '../store/user';
import { Button } from './Button';

export const FollowButton = () => {
  const [isFollowing, setIsFollowing] = useState();

  const myId = useSelector(selectCurrentUserId);
  const otherUserId = useSelector(selectSelectedUserId);
  console.log(otherUserId);

  const onPressFollow = () => {
    follow();
    setIsFollowing(true);
  };

  const onPressUnfollow = () => {
    unFollow();
    setIsFollowing(false);
  };

  useEffect(() => {
    checkFollowing(myId, otherUserId).then((result) => {
      console.log(result);
      setIsFollowing(result);
    });
  }, []);

  return isFollowing ? <Button secondary text="Following" onPress={onPressUnfollow} /> : <Button gradient text="Follow" onPress={onPressFollow} />;
};

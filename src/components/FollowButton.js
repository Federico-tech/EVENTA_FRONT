import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { checkFollowing, follow, unFollow } from '../services/follow';
import { selectCurrentUser, selectCurrentUserId, selectSelectedUser, selectSelectedUserId } from '../store/user';
import { Button } from './Button';

export const FollowButton = () => {
  const organiser = useSelector(selectSelectedUser)
  console.log('Org', organiser.isFollowing)


  const onPressFollow = () => {
    follow();
  };

  const onPressUnfollow = () => {
    unFollow();
  };


  return organiser.isFollowing ? <Button secondary text="Following" onPress={onPressUnfollow} /> : <Button gradient text="Follow" onPress={onPressFollow} />;
};

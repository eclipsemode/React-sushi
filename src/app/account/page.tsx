'use client';
import React from 'react';
import Profile from '@components/Account/Profile';
import { useAppSelector } from '@store/hooks';
import { selectUser } from '@store/features/user';

const Page = () => {
  const { userInfo } = useAppSelector(selectUser);
  return <Profile userInfo={userInfo} />;
};

export default Page;
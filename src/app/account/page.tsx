'use client';
import React from 'react';
import Profile from '@components/Account/Profile';
import { useAppSelector } from '@store/hooks';
import { selectUser } from '@store/features/user/api';

const Page = () => {
  const { user } = useAppSelector(selectUser);
  if (user) return <Profile user={user} />;
};

export default Page;

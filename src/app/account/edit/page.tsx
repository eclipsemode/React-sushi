'use client';
import React from 'react';
import Edit from '@components/Account/Edit';
import { useAppSelector } from '@store/hooks';
import { selectUser } from '@store/features/user/api';

const Page = () => {
  const { user } = useAppSelector(selectUser);
  if (user) return <Edit user={user} />;
};

export default Page;

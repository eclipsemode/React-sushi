'use client';
import React from 'react';
import Edit from '@components/Account/Edit';
import { useAppSelector } from '@store/hooks';
import { selectMaterialDialog } from '@store/features/materialDialog/api';
import { selectUser } from '@store/features/user';

const Page = () => {
  const { userInfo } = useAppSelector(selectUser);
  const { applyCallback } = useAppSelector(selectMaterialDialog);

  return userInfo && <Edit userInfo={userInfo} applyCallback={applyCallback} />;
};

export default Page;
'use client';
import React from 'react';
import Orders from '@components/Account/Orders';
import { useAppSelector } from '@store/hooks';
import { selectAccountOrders } from '@store/features/account/api';

const Page = () => {
  const { count } = useAppSelector(selectAccountOrders);
  return <Orders count={count} />;
};

export default Page;
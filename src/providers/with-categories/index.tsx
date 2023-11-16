'use client';
import React from 'react';
import { useAppDispatch } from '@store/hooks';
import { ICategories, setCategories } from '@store/features/categories/api';

interface IProps {
  children: React.ReactNode;
  categories: ICategories[];
}

const WithCategories = ({ categories, children }: IProps) => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(setCategories(categories));
  }, [categories, dispatch]);

  return <>{children}</>;
};

export default WithCategories;

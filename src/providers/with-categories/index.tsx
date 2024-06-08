'use client';
import { useAppDispatch } from '@store/hooks';
import { setCategories } from '@store/features/categories/api';
import { ReactNode, useLayoutEffect } from 'react';
import { setCategoryId } from '@store/features/filter/api';
import { ICategory } from '@store/features/categories/model';

interface IProps {
  children: ReactNode;
  categories: ICategory[];
}

const WithCategories = ({ categories, children }: IProps) => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(setCategories(categories));
    dispatch(setCategoryId(categories[0]?.id || ''));
  }, [categories, dispatch]);

  return <>{children}</>;
};

export default WithCategories;

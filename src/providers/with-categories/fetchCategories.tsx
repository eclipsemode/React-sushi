import React from 'react';
import WithCategories from '@providers/with-categories';
import { ICategories } from '@store/features/categories/api';

async function getCategories(): Promise<ICategories[]> {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}api/categories`,
    { cache: 'no-store' },
  );
  return response.json();
}

interface IProps {
  children: React.ReactNode
}

const FetchCategories = async ({children}: IProps) => {
  const categories = await getCategories();
  return <WithCategories categories={categories}>{children}</WithCategories>;
};

export default FetchCategories;

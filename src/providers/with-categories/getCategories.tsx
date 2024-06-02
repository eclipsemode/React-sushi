import { ReactNode } from 'react';
import WithCategories from '@providers/with-categories';
import { ICategory } from '@store/features/categories/model';

async function getCategories(): Promise<ICategory[]> {
  const response = await fetch(`${process.env.REACT_APP_API_URL}api/category`, {
    cache: 'no-store',
  });
  return response.json();
}

interface IProps {
  children: ReactNode;
}

const GetCategories = async ({ children }: IProps) => {
  const categories = await getCategories();
  return <WithCategories categories={categories}>{children}</WithCategories>;
};

export default GetCategories;

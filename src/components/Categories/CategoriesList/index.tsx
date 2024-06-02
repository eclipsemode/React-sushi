'use client';
import React from 'react';
import Link from 'next/link';
import MenuButton from '@shared/UI/MenuButton';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { IFilterState, setCategoryId } from '@store/features/filter/api';
import { ICategory } from '@store/features/categories/model';

interface IProps {
  categories: ICategory[];
}

const CategoriesList = ({ categories }: IProps) => {
  const dispatch = useAppDispatch();
  const { categoryId } = useAppSelector((state) => state.filterReducer);

  const handleClickCategory = (categoryId: IFilterState['categoryId']) => {
    dispatch(setCategoryId(categoryId));
  };

  return categories.map((category) => (
    <li key={category.id} onClick={() => handleClickCategory(category.id)}>
      <Link href={`/?categoryId=${category.id}`}>
        <MenuButton
          image={`${process.env.REACT_APP_API_URL}/images/category/${category.image}`}
          text={category.name}
          active={categoryId === category.id}
        />
      </Link>
    </li>
  ));
};

export default CategoriesList;

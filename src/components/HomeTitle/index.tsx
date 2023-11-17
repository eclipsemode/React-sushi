'use client';
import React from 'react';
import { Skeleton } from '@mui/material';
import { useAppSelector } from '@store/hooks';
import styles from './index.module.scss'

const HomeTitle = () => {
  const { categories } = useAppSelector((state) => state.categoriesReducer);
  const { categoryNumber } = useAppSelector((state) => state.filterReducer);
  return (
    <h2 className={styles.content__title}>
      {categories.length !== 0 ? (
        categories.find((category) => category.id === categoryNumber)?.name
      ) : (
        <Skeleton animation="wave" width={150} height={50} />
      )}
    </h2>
  );
};

export default HomeTitle;

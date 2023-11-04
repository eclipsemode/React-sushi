'use client';
import React from 'react';
import styles from './index.module.scss';
import { setCategoryNumber } from '@store/features/filter/api';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import MenuButton from '@shared/UI/MenuButton';
import { Skeleton } from '@mui/material';
import Link from 'next/link';

const Categories: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categoriesStatus, categories } = useAppSelector(
    (state) => state.categoriesReducer
  );
  const { categoryNumber } = useAppSelector((state) => state.filterReducer);
  const handleClickCategory = (id: number) => {
    dispatch(setCategoryNumber(id));
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.root}>
        {categoriesStatus !== 'fulfilled'
          ? [...new Array(10)].map((_, index) => (
              <li key={index}>
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width={130}
                  height={69}
                  sx={{ borderRadius: '12px' }}
                />
              </li>
            ))
          : categories.map((category) => (
              <li
                key={category.id}
                onClick={() => handleClickCategory(category.id)}
              >
                <Link href={`/?categoryNumber=${category.id}`}>
                  <MenuButton
                    image={`${process.env.REACT_APP_API_URL}/images/category/${category.image}`}
                    text={category.name}
                    active={categoryNumber === category.id}
                  />
                </Link>
              </li>
            ))}
      </ul>
    </nav>
  );
};

export default Categories;

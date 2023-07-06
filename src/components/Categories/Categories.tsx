"use client"
import React from 'react';
import styles from './index.module.scss';
import { setCategoryNumber } from '@store/features/filter/api';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import MenuButton from '@shared/UI/MenuButton';
import { Skeleton } from '@mui/material';
import Link from "next/link";

function Categories() {
    const dispatch = useAppDispatch();
    const { categoriesStatus, categories } = useAppSelector((state) => state.categoriesReducer);
    const { categoryNumber } = useAppSelector((state) => state.filterReducer);
    const handleClickCategory = (id: number) => {
        dispatch(setCategoryNumber(id));
    };
    const categoryImg = (i: number) => {
        switch (i) {
            case 0:
                return '/images/menu/pizza-slice.png';
            case 1:
                return '/images/menu/nabory.png';
            case 2:
                return '/images/menu/sushi.png';
            case 3:
                return '/images/menu/sushi--gunkany.png';
            case 4:
                return '/images/menu/take-away.png';
            case 5:
                return '/images/menu/soup.png';
            case 6:
                return '/images/menu/salad.png';
            case 7:
                return '/images/menu/snack.png';
            case 8:
                return '/images/menu/sauces.png';
            case 9:
                return '/images/menu/napitki.png';
        }
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
                    : categories.map((category, index) => (
                          <li key={category.id} onClick={() => handleClickCategory(category.id)}>
                              <Link href={`/?categoryNumber=${category.id}`}>
                                  <MenuButton
                                      image={categoryImg(index)}
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

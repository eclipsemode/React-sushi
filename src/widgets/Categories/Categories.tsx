import React from 'react';
import styles from './index.module.scss';
import PizzaImg from 'app/assets/img/menu/pizza-slice.png';
import SetImg from 'app/assets/img/menu/nabory.png';
import RollsImg from 'app/assets/img/menu/sushi.png';
import SushiImg from 'app/assets/img/menu/sushi--gunkany.png';
import SoupImg from 'app/assets/img/menu/soup.png';
import SaladsImg from 'app/assets/img/menu/salad.png';
import WokImg from 'app/assets/img/menu/take-away.png';
import SouceImg from 'app/assets/img/menu/sauces.png';
import NapitkiImg from 'app/assets/img/menu/napitki.png';
import ZakuskiImg from 'app/assets/img/menu/snack.png';

import { setCategoryNumber } from 'features/filter/api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Link } from 'react-router-dom';
import MenuButton from '../../shared/UI/MenuButton';
import { Skeleton } from '@mui/material';

const Categories: React.FC = () => {
    const dispatch = useAppDispatch();
    const { categoriesStatus, categories } = useAppSelector((state) => state.categoriesReducer);
    const { categoryNumber } = useAppSelector((state) => state.filterReducer);

    const handleClickCategory = (id: number) => {
        dispatch(setCategoryNumber(id));
    };
    const categoryImg = (i: number) => {
        switch (i) {
            case 0:
                return PizzaImg;
            case 1:
                return SetImg;
            case 2:
                return RollsImg;
            case 3:
                return SushiImg;
            case 4:
                return WokImg;
            case 5:
                return SoupImg;
            case 6:
                return SaladsImg;
            case 7:
                return ZakuskiImg;
            case 8:
                return SouceImg;
            case 9:
                return NapitkiImg;
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
                              <Link to={`/?categoryNumber=${category.id}`}>
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

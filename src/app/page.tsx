import Banner from '@components/Banner';
import { Sort } from '@store/features/filter/ui';
import Products from '@store/features/products/ui/Products';
import React from 'react';
import HomeTitle from '@components/HomeTitle';
import Categories from '@store/features/categories/ui';
import HomeInfo from '@components/HomeInfo';
import styles from './index.module.scss'

const Home = () => {
  return (
    <>
      <Banner />
      <HomeInfo />
      <div className={styles.content__top}>
        <Categories />
      </div>
      <div className={styles.container}>
        <section className={styles.content__head}>
          <HomeTitle />
          <Sort />
        </section>
        <Products />
      </div>
    </>
  );
};

export default Home;

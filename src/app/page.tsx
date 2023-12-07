import Banner from '@components/Banner';
import Products from '@components/Products';
import React from 'react';
import HomeTitle from '@components/HomeTitle';
import Categories from '@components/Categories';
import HomeInfo from '@components/HomeInfo';
import styles from './index.module.scss'
import Filter from '@components/Filter';

const Home = () => {
  return (
    <>
      <Banner />
      <HomeInfo />
      <div className={styles.content__top}>
        <Categories />
          <p>test</p>
      </div>
      <div className={styles.container}>
        <section className={styles.content__head}>
          <HomeTitle />
          <Filter/>
        </section>
        <Products />
      </div>
    </>
  );
};

export default Home;

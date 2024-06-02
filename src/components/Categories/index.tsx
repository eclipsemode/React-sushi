'use client';
import styles from './index.module.scss';
import { useAppSelector } from '@store/hooks';
import CategoriesSkeleton from '@components/Categories/CategoriesSkeleton';
import CategoriesList from '@components/Categories/CategoriesList';

const Categories = () => {
  const { categoriesStatus, categories } = useAppSelector(
    (state) => state.categoriesReducer
  );

  return (
    <nav className={styles.nav}>
      <ul className={styles.root}>
        {categoriesStatus !== 'fulfilled' ? (
          <CategoriesSkeleton />
        ) : (
          <CategoriesList categories={categories} />
        )}
      </ul>
    </nav>
  );
};

export default Categories;

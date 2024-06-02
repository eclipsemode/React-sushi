import React from 'react';
import ProductItem from '@components/Products/ProductItem';
import { selectProducts } from '@store/features/products/api';
import { useAppSelector } from '@store/hooks';
import styles from './index.module.scss';

const Fulfilled: React.FC = () => {
  const { products } = useAppSelector(selectProducts);

  return (
    <section className={styles.products}>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </section>
  );
};

export default Fulfilled;

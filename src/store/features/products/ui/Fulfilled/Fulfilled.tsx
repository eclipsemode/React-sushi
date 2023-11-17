import React from 'react';
import Item from '../Item/Item';
import { IProduct, selectProducts } from '@store/features/products/api';
import { useAppSelector } from '@store/hooks';
import styles from './index.module.scss'

const Fulfilled: React.FC = () => {
  const { products } = useAppSelector(selectProducts);

  return (
    <section className={styles.products}>
      {products.map((product: IProduct[]) => (
        <Item key={product.at(0)?.id} product={product} />
      ))}
    </section>
  );
};

export default Fulfilled;

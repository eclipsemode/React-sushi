'use client';
import React from 'react';
import CartEmpty from '@components/CartEmpty';
import { useAppSelector } from '@store/hooks';
import CartOrder from '@components/Cart';
import styles from './index.module.scss';

const Cart: React.FC = () => {
  const { products } = useAppSelector((state) => state.cartReducer);

  return (
    <div className={styles.container}>
      {products.length > 0 ? <CartOrder /> : <CartEmpty />}
    </div>
  );
};

export default Cart;

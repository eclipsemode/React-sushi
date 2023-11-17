'use client';
import React from 'react';
import CartEmpty from '@components/CartEmpty';
import { useAppSelector } from '@store/hooks';
import CartOrder from '@store/features/order/ui';
import styles from './index.module.scss'

const Cart: React.FC = () => {
  const { items }: any = useAppSelector((state) => state.cartReducer);

  return (
    <div className={styles.container}>
      {items.length > 0 ? <CartOrder /> : <CartEmpty />}
    </div>
  );
};

export default Cart;

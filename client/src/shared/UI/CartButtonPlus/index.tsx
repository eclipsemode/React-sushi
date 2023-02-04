import React from 'react';
import styles from '../CartButtonMinus/index.module.css';
import { TiPlus } from 'react-icons/ti';
import { useDispatch } from "react-redux";
import { addItem } from "entities/cart";
import { IProducts } from "entities/products";

interface CartButtonPlusType {
    product: IProducts;
    amount: number;
}

const CartButtonPlus: React.FC<CartButtonPlusType> = React.memo(({ product, amount }) => {
  const dispatch = useDispatch();

  const handleAddItem = () => {
    dispatch(addItem(product))
  }
    return (
        <button disabled={amount === 99} onClick={() => handleAddItem()} className={styles.root}>
            <TiPlus />
        </button>
    );
});

export default CartButtonPlus;

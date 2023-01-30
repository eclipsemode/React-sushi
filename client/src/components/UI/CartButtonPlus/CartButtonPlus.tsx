import React from 'react';
import styles from '../CartButtonMinus/CartButtonMinus.module.css';
import { TiPlus } from 'react-icons/ti';
import { useDispatch } from "react-redux";
import { addItem } from "entities/cartSlice";
import { IProducts } from "entities/productsSlice";

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

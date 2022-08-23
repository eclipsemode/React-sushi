import React from 'react';
import styles from '../CartButtonMinus/CartButtonMinus.module.css';
import { TiPlus } from 'react-icons/ti';
import { useDispatch } from "react-redux";
import { addItem } from "../../../redux/features/cartSlice";
import { ProductsType } from "../../../redux/features/productsSlice";

interface CartButtonPlusType {
    product: ProductsType
}

const CartButtonPlus: React.FC<CartButtonPlusType> = React.memo(({ product }) => {
  const dispatch = useDispatch();

  const handleAddItem = () => {
    dispatch(addItem(product))
  }
    return (
        <button disabled={product.amount === 99} onClick={() => handleAddItem()} className={styles.root}>
            <TiPlus />
        </button>
    );
});

export default CartButtonPlus;

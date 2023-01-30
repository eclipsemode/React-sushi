import React from "react";
import styles from "./CartButtonMinus.module.css";
import { TiMinus } from "react-icons/ti";
import { IProducts } from "entities/productsSlice";
import { useDispatch } from "react-redux";
import { removeItem } from "entities/cartSlice";

interface CartButtonMinusType {
  product: IProducts;
  amount: number;
  disabled?: boolean
}

const CartButtonMinus: React.FC<CartButtonMinusType> = React.memo(({ product, amount, disabled }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    dispatch(removeItem(product.id))
  }

  if (disabled === undefined) disabled = true;

  return (
    <button disabled={ disabled && amount === 1} onClick={() => handleRemoveItem()} className={styles.root}>
      <TiMinus />
    </button>
  );
});

export default CartButtonMinus;

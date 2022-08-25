import React from "react";
import styles from "./CartButtonMinus.module.css";
import { TiMinus } from "react-icons/ti";
import { ProductsType } from "../../../redux/features/productsSlice";
import { useDispatch } from "react-redux";
import { removeItem } from "../../../redux/features/cartSlice";

interface CartButtonMinusType {
  product: ProductsType;
  amount: number;
  disabled?: boolean
}

const CartButtonMinus: React.FC<CartButtonMinusType> = React.memo(({ product, amount, disabled }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    dispatch(removeItem(product.id))
    // amount > 1 ? dispatch(removeItem(product.id)) : dispatch(removeItemById(product.id));
  }

  if (disabled === undefined) disabled = true;

  return (
    <button disabled={ disabled && amount === 1} onClick={() => handleRemoveItem()} className={styles.root}>
      <TiMinus />
    </button>
  );
});

export default CartButtonMinus;

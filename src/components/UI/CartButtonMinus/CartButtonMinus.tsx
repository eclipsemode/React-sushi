import React from "react";
import styles from "./CartButtonMinus.module.css";
import { TiMinus } from "react-icons/ti";
import { ProductsType } from "../../../redux/features/productsSlice";
import { useDispatch } from "react-redux";
import { removeItem } from "../../../redux/features/cartSlice";

interface CartButtonMinusType {
  product: ProductsType;
}

const CartButtonMinus: React.FC<CartButtonMinusType> = React.memo(({ product }) => {
  const dispatch = useDispatch();
  const handleRemoveItem = () => {
    dispatch(removeItem(product.id))
  }
  return (
    <button disabled={product.amount === 1} onClick={() => handleRemoveItem()} className={styles.root}>
      <TiMinus />
    </button>
  );
});

export default CartButtonMinus;

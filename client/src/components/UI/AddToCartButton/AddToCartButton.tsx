import React from "react";
import styles from "./AddToCartButton.module.css";
import { CartButtonMinus, CartButtonPlus } from "../index";
import { IProducts } from "entities/productsSlice";
import { addItem } from "entities/cartSlice";
import { useAppDispatch, useAppSelector } from "app/utils";

type AddToCartButtonProps = {
  product: IProducts;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) => state.cart.items.find((obj: IProducts) => obj.id === product.id));
  let amount = !cartItem ? 0 : cartItem.amount;

  const handleAddProduct = () => {
    dispatch(addItem(product));
  };

  return (
    amount > 0 ? (
      <div className={styles.root__amountBlock}>
        <CartButtonMinus product={product} amount={amount} disabled={false} />
        <span>{amount}</span>
        <CartButtonPlus product={product} amount={amount} />
      </div>
    ) : (
      <button className={styles.root} onClick={() => handleAddProduct()}>
        <span>Добавить</span>
        <span>{amount === 0 ? "+" : "x" + amount}</span>
      </button>
    )
  );

};

export default AddToCartButton;
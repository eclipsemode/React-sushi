import React from "react";
import styles from "./index.module.css";
// import { CartButtonMinus, CartButtonPlus } from "../index";
import { IProducts } from "entities/products";
import { addItem, removeItem } from "entities/cart";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";

type AddToCartButtonProps = {
  product: IProducts;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) => state.cartReducer.items.find((obj: IProducts) => obj.id === product.id));
  let amount = !cartItem ? 0 : cartItem.amount;
  const handleAddItem = () => {
    dispatch(addItem(product))
  }

  const handleRemoveItem = () => {
    dispatch(removeItem(product.id));
  }

  const handleAddProduct = () => {
    dispatch(addItem(product));
  };

  return (
    amount > 0 ? (
      <div className={styles.root__amountBlock}>
        <MinusCircleOutlined style={amount <= 0 ? {color: 'rgba(31, 32, 65, 0.2)', pointerEvents: "none", fontSize: '24px'} : {fontSize: '24px'}} className={styles.root__minus} onClick={() => handleRemoveItem()} />
        <span>{amount}</span>
        <PlusCircleOutlined style={amount >= 9 ? {color: 'rgba(31, 32, 65, 0.2)', pointerEvents: "none", fontSize: '24px'} : {fontSize: '24px'}} className={styles.root__plus} onClick={() => handleAddItem()} />
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
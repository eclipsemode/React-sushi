import React from "react";
import styles from './CartBlock.module.css';
import { Link } from "react-router-dom";
import cartImg from "../../../assets/img/shopping-cart.png";

type CartBlockProps = {
  totalPrice: number;
  totalAmount: number
}

const CartBlock: React.FC<CartBlockProps> = React.memo(({totalPrice, totalAmount}) => {
  return (
    <div className={styles.root}>
      <Link to={'/cart'}>
        <img width="32" height="32" src={cartImg} alt="cart"/>
        <div>{totalAmount}</div>
      </Link>
      <span>{totalPrice} ₽</span>
    </div>
  );
});

export default CartBlock;
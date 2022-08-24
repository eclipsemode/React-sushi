import React from "react";
import styles from './AddToCartButton.module.css';
import { CartButtonMinus, CartButtonPlus } from "../index";
import { ProductsType } from "../../../redux/features/productsSlice";
import { useDispatch } from "react-redux";
import { addItem } from "../../../redux/features/cartSlice";
import { useAppSelector } from "../../../redux/hooks";

type AddToCartButtonProps = {
  product: ProductsType;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({product}) => {
  const dispatch = useDispatch();
  const cartItem = useAppSelector((state) => state.cart.items.find((obj: ProductsType) => obj.id === product.id));
  let amount = !cartItem ? 0 : cartItem.amount;

  const handleAddProduct = () => {
    dispatch(addItem(product))
  }

  return (
    amount > 0 ? (
      <div className={styles.root__amountBlock}>
        <CartButtonMinus product={product} amount={amount} />
        <span>{amount}</span>
        <CartButtonPlus product={product} amount={amount}/>
      </div>
    ) : (
      <button className={styles.root} onClick={() => handleAddProduct()}>
        <span>Добавить</span>
        <span>{amount === 0 ? '+' : 'x' + amount}</span>
      </button>
    )
)

}






export default AddToCartButton;
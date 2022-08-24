// @ts-nocheck
import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItemById } from '../../redux/features/cartSlice';
import { CartButtonMinus, CartButtonPlus } from '../UI';
import { ProductsType } from '../../redux/features/productsSlice';
import styles from './CartItem.module.css';
import { IoClose } from "react-icons/io5";

export type CartItemProps = {
    obj: ProductsType;
};

const CartItem: React.FC<CartItemProps> = ({ obj }) => {
    const dispatch = useDispatch();

    const handleRemoveItemById = (id: string) => {
        dispatch(removeItemById(id));
    };
    return (
      <tr className={styles.root}>
        <td className={styles.root__product}><IoClose/><img height="100" src={obj.imageUrl} alt="productImg"/><h5>{obj.name}</h5></td>
        <td className={styles.root__price}>{obj.price} ₽</td>
        <td className={styles.root__amount}><div><CartButtonMinus product={obj}/>{obj.amount}<CartButtonPlus product={obj}/></div></td>
        <td className={styles.root__total}>{obj.price * obj.amount} ₽</td>
      </tr>
    );
};

export default CartItem;

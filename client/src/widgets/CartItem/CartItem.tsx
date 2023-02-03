import React from 'react';
import { removeItemById } from 'entities/cart';
import { CartButtonMinus, CartButtonPlus } from 'shared/UI';
import { IProducts } from 'entities/products';
import styles from './CartItem.module.css';
import { IoClose } from 'react-icons/io5';
import { useAppDispatch } from "app/hooks";

export type CartItemProps = {
    obj: IProducts;
};

const CartItem: React.FC<CartItemProps> = ({ obj }) => {
    const dispatch = useAppDispatch();

    const handleRemoveItemById = () => {
        dispatch(removeItemById(obj.id));
    };
    return (
        <tr className={styles.root}>
            <td className={styles.root__product}>
                <IoClose onClick={() => handleRemoveItemById()} />
                <img height="100" src={process.env.REACT_APP_API_URL + obj.image} alt="productImg" />
                <h5>{obj.name}</h5>
            </td>
            <td className={styles.root__price}>{obj.price} ₽</td>
            <td className={styles.root__amount}>
                <div>
                    <CartButtonMinus product={obj} amount={obj.amount} />
                    {obj.amount}
                    <CartButtonPlus product={obj} amount={obj.amount} />
                </div>
            </td>
            <td className={styles.root__total}>{obj.price * obj.amount} ₽</td>
        </tr>
    );
};

export default CartItem;

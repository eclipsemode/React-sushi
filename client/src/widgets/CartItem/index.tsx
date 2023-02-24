import React from 'react';
import { addItem, removeItem, removeItemById } from "entities/cart";
import { IProducts } from 'entities/products';
import styles from './index.module.css';
import { useAppDispatch } from "app/hooks";
import { CloseOutlined, MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";

export type CartItemProps = {
    obj: IProducts;
};

const CartItem: React.FC<CartItemProps> = ({ obj }) => {
    const dispatch = useAppDispatch();

  const handleAddItem = () => {
    dispatch(addItem(obj))
  }

  const handleRemoveItem = () => {
    dispatch(removeItem(obj.id));
  }

    const handleRemoveItemById = () => {
        dispatch(removeItemById(obj.id));
    };
    return (
        <tr className={styles.root}>
            <td className={styles.root__product}>
                <CloseOutlined onClick={() => handleRemoveItemById()} />
                <img height="100" src={process.env.REACT_APP_API_URL + obj.image} alt="productImg" />
                <h5>{obj.name}</h5>
            </td>
            <td className={styles.root__price}>{obj.price} ₽</td>
            <td className={styles.root__amount}>
                <div>
                  <MinusCircleOutlined style={{fontSize: '24px'}} className={styles.root__minus} onClick={() => handleRemoveItem()} />
                    {obj.amount}
                  <PlusCircleOutlined style={{fontSize: '24px'}} className={styles.root__plus} onClick={() => handleAddItem()} />
                </div>
            </td>
            <td className={styles.root__total}>{obj.price * obj.amount} ₽</td>
        </tr>
    );
};

export default CartItem;

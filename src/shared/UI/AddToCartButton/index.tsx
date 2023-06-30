import React from 'react';
import styles from './index.module.scss';
import {addItem, ICartProduct, removeItem} from 'entities/cart';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

type AddToCartButtonProps = {
    product: ICartProduct;
};

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
    const dispatch = useAppDispatch();
    const cartItem = useAppSelector((state) => state.cartReducer.items.find((obj: ICartProduct) => obj.sizeId === product.sizeId));
    let amount = !cartItem ? 0 : cartItem.amount;
    const handleAddItem = () => {
        dispatch(addItem(product));
    };

    const handleRemoveItem = () => {
        dispatch(removeItem(product.sizeId));
    };

    const handleAddProduct = () => {
        dispatch(addItem(product));
    };

    return amount > 0 ? (
        <div className={styles.root__amountBlock}>
            <MinusCircleOutlined
                style={{ fontSize: '24px' }}
                className={styles.root__minus}
                onClick={() => handleRemoveItem()}
            />
            <span>{amount}</span>
            <PlusCircleOutlined
                style={{ fontSize: '24px' }}
                className={styles.root__plus}
                onClick={() => handleAddItem()}
            />
        </div>
    ) : (
        <button className={styles.root} onClick={() => handleAddProduct()}>
            <span>Добавить</span>
            <span>{amount === 0 ? '+' : 'x' + amount}</span>
        </button>
    );
};

export default AddToCartButton;

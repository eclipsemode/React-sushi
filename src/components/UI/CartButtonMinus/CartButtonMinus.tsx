import React from 'react';
import { CartItemProps } from '../../CartItem/CartItem';
import styles from './CartButtonMinus.module.css';
import { TiMinus } from 'react-icons/ti';

interface CartButtonMinusType extends CartItemProps {
    handleRemoveItem: () => void;
}

const CartButtonMinus: React.FC<CartButtonMinusType> = React.memo(({ obj, handleRemoveItem }) => {
    return (
        <button disabled={obj.amount === 1} onClick={() => handleRemoveItem()} className={styles.root}>
            <TiMinus />
        </button>
    );
});

export default CartButtonMinus;

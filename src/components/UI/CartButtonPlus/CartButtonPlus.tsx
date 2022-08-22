import React from 'react';
import styles from '../CartButtonMinus/CartButtonMinus.module.css';
import { CartItemProps } from '../../CartItem/CartItem';
import { TiPlus } from 'react-icons/ti';

interface CartButtonPlusType extends CartItemProps {
    handleAddItem: () => void;
}

const CartButtonPlus: React.FC<CartButtonPlusType> = React.memo(({ obj, handleAddItem }) => {
    return (
        <button disabled={obj.amount === 99} onClick={() => handleAddItem()} className={styles.root}>
            <TiPlus />
        </button>
    );
});

export default CartButtonPlus;

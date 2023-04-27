import React from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

type CartBlockProps = {
    totalPrice: number;
    totalAmount: number;
};

const CartBlock: React.FC<CartBlockProps> = ({ totalPrice, totalAmount }) => {
    return (
        <div className={styles.root}>
            <Link to={'/cart'}>
                <ShoppingCartIcon width={32} height={32} />
                <div>{totalAmount}</div>
            </Link>
            <span>{totalPrice} ₽</span>
        </div>
    );
};

export default CartBlock;

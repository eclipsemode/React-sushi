import React from 'react';
import { useSelector } from 'react-redux';
import { CartEmpty, CartOrder } from '../components';

const Cart: React.FC = () => {
    const { items }: any = useSelector<any>((state) => state.cart);

    return <div className="content">{items.length > 0 ? <CartOrder /> : <CartEmpty />}</div>;
};

export default Cart;

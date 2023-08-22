"use client"
import React from "react";
import CartEmpty from "@components/CartEmpty/CartEmpty";
import { useAppSelector } from "@store/hooks";
import CartOrder from "@store/features/order/ui";

const Cart: React.FC = () => {
    const { items }: any = useAppSelector((state) => state.cartReducer);

    return <div className='container'>{items.length > 0 ? <CartOrder /> : <CartEmpty />}</div>;
};

export default Cart;
import React from "react";
import { CartEmpty, CartOrder } from "widgets";
import { useAppSelector } from "app/hooks";

const Index: React.FC = () => {
  const { items }: any = useAppSelector((state) => state.cartReducer);

  return <div className="content">{items.length > 0 ? <CartOrder /> : <CartEmpty />}</div>;
};

export default Index;

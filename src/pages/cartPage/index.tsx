import React from "react";
import { CartEmpty } from "widgets";
import { useAppSelector } from "app/hooks";
import CartOrder from "features/order/ui";

const Index: React.FC = () => {
  const { items }: any = useAppSelector((state) => state.cartReducer);

  return <div>{items.length > 0 ? <CartOrder /> : <CartEmpty />}</div>;
};

export default Index;

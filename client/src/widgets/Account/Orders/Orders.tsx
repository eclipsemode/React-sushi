import React from "react";
import BlockForm from "shared/UI/BlockForm";
import { fetchOrdersByUserId } from "../api";
import { useAppDispatch } from "app/hooks";
import { IOrder } from "features/order/model";

const Orders: React.FC = () => {
  const dispatch = useAppDispatch();
  const [orders, setOrders] = React.useState<IOrder | null | unknown>(null);

  React.useEffect(() => {
    (async function fn() {
      const { payload } = await dispatch(fetchOrdersByUserId());
      setOrders(payload)
    })()

  }, [dispatch])
  return (
    <BlockForm>
      {
        JSON.stringify(orders)
      }
    </BlockForm>
  );
};

export default Orders;
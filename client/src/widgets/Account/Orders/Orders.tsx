import React from "react";
import BlockForm from "shared/UI/BlockForm";
import { fetchOrdersByUserId, IOrdersFetched } from "../api";
import { useAppDispatch } from "app/hooks";
import OrdersList from "../../OrdersList";

const Orders: React.FC = () => {
  const dispatch = useAppDispatch();
  const [orders, setOrders] = React.useState<IOrdersFetched[]>();

  React.useEffect(() => {
    (async function fn() {
      const { payload }: any = await dispatch(fetchOrdersByUserId());
      setOrders(payload);
    })()
  }, [dispatch])
  return (
    <BlockForm>
      {
        orders && <OrdersList orders={orders}/>
      }
    </BlockForm>
  );
};

export default Orders;
import React from "react";
import { fetchOrdersByUserId, IOrdersFetched, IOrdersReducer } from "../api";
import { useAppDispatch, useAppSelector } from "app/hooks";
import OrdersList from "../../OrdersList";
import styles from "./index.module.scss";
import { Empty } from "antd";
import {Skeleton} from "@mui/material";

const Orders: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state): IOrdersReducer => state.ordersReducer)
  const [orders, setOrders] = React.useState<IOrdersFetched[]>();


  React.useEffect(() => {
    (async function fn() {
      const { payload }: any = await dispatch(fetchOrdersByUserId());
      setOrders(payload);
    })();
  }, [dispatch]);

  return (
    status === "PENDING" ? <Skeleton animation='wave' height={500} sx={{transform: 'none', width: '100%'}} />
      : status === "FULFILLED" && orders ? <OrdersList orders={orders} />
      :
        (
          <div className={styles.root__empty}>
            <Empty description={false} />
            <p>У вас еще нет заказов.</p>
          </div>
        )
  )
};

export default Orders;
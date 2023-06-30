import React from "react";
import { fetchOrdersByUserId, IOrdersFetched, IOrdersReducer } from "../api";
import { useAppDispatch, useAppSelector } from "app/hooks";
import OrdersList from "../../OrdersList";
import styles from "./index.module.scss";
import { Empty } from "antd";
import {Skeleton} from "@mui/material";
import {enqueueSnackbar} from "notistack";

const Orders: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state): IOrdersReducer => state.ordersReducer)
    const [orders, setOrders] = React.useState<IOrdersFetched[]>();


  React.useEffect(() => {
    (async function fn() {
        try {
            const orders: any = await dispatch(fetchOrdersByUserId()).unwrap();
            if (orders) {
                setOrders(orders);
            }
        } catch (e) {
            enqueueSnackbar('Ошибка загрузки истории заказов', { variant: 'error' })
        }
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
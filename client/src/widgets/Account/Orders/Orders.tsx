import React from "react";
import { fetchOrdersByUserId, IOrdersFetched, IOrdersReducer } from "../api";
import { useAppDispatch, useAppSelector } from "app/hooks";
import OrdersList from "../../OrdersList";
import styles from "./index.module.css";
import { Empty, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Orders: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state): IOrdersReducer => state.ordersReducer)
  const [orders, setOrders] = React.useState<IOrdersFetched[]>();

  const antIcon = <LoadingOutlined style={{ fontSize: 44 }} spin />;

  React.useEffect(() => {
    (async function fn() {
      const { payload }: any = await dispatch(fetchOrdersByUserId());
      setOrders(payload);
    })();
  }, [dispatch]);

  return (
    status === "PENDING" ? <Spin indicator={antIcon} style={{flex: "1 2", marginTop: "5em"}} />
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
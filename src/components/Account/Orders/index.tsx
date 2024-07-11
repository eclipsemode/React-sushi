'use client';
import React from 'react';
import styles from './index.module.scss';
import { Pagination, Stack } from '@mui/material';
import OrdersList from '@components/OrdersList';
import { Empty } from 'antd';
import Colors from '@shared/utils/Colors';
import { enqueueSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { IOrder } from '@store/features/order/model';
import {
  AccountOrdersListSize,
  getOrdersByUserId,
} from '@store/features/order/api';
import { selectAuth } from '@store/features/auth/api';

const Orders = () => {
  const { ordersCount } = useAppSelector((state) => state.orderReducer);
  const dispatch = useAppDispatch();
  const [orders, setOrders] = React.useState<IOrder[]>();
  const { authUserId } = useAppSelector(selectAuth);

  async function getOrders(page: number = 1) {
    try {
      const ordersRes = await dispatch(
        getOrdersByUserId({ page, size: AccountOrdersListSize })
      ).unwrap();
      setOrders(ordersRes.orders);
    } catch (e) {
      enqueueSnackbar('Ошибка загрузки истории заказов', {
        variant: 'error',
      });
    }
  }

  React.useEffect(() => {
    if (authUserId) getOrders().then();
  }, [authUserId]);

  const getPages = () => {
    let count = ordersCount / AccountOrdersListSize;
    const countRemain = ordersCount % AccountOrdersListSize;

    if (countRemain > 0) count++;

    return Math.floor(count);
  };

  return (
    <Stack sx={{ width: '100%' }}>
      {orders && orders.length > 0 ? (
        <>
          <OrdersList orders={orders} />
          <Pagination
            onChange={(_, page) => getOrders(page)}
            count={getPages()}
            sx={{
              justifyContent: 'center',
              display: 'flex',
              marginTop: '10px',
              ' button, .MuiPaginationItem-root': { color: Colors.$rootText },
            }}
          />
        </>
      ) : (
        <div className={styles.root__empty}>
          <Empty description={false} />
          <p>У вас еще нет заказов.</p>
        </div>
      )}
    </Stack>
  );
};

export default Orders;

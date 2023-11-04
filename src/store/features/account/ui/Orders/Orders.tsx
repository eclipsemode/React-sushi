import React from 'react';
import {
  AccountOrdersListSize,
  fetchOrdersByUserId,
  IFetchOrdersByUserId,
  IOrdersFetched,
  IOrdersReducer,
} from '@store/features/account/api';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import OrdersList from '@components/OrdersList';
import styles from './index.module.scss';
import { Empty } from 'antd';
import { Pagination, Skeleton, Stack } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import Colors from '@shared/utils/Colors';

const Orders: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status, count } = useAppSelector(
    (state): IOrdersReducer => state.ordersReducer
  );
  const [orders, setOrders] = React.useState<IOrdersFetched[]>();

  React.useEffect(() => {
    (async function fn() {
      try {
        const orders: IFetchOrdersByUserId = await dispatch(
          fetchOrdersByUserId({ page: 1, size: AccountOrdersListSize })
        ).unwrap();
        if (orders) {
          setOrders(orders.rows);
        }
      } catch (e) {
        enqueueSnackbar('Ошибка загрузки истории заказов', {
          variant: 'error',
        });
      }
    })();
  }, [dispatch]);

  const changePage = async (page: number) => {
    try {
      const orders: IFetchOrdersByUserId = await dispatch(
        fetchOrdersByUserId({ page, size: AccountOrdersListSize })
      ).unwrap();
      if (orders) {
        setOrders(orders.rows);
      }
    } catch (e) {
      enqueueSnackbar('Произошла ошибка, попробуйте позднее', {
        variant: 'error',
      });
    }
  };

  return (
    <Stack sx={{ width: '100%' }}>
      {status === 'PENDING' ? (
        <Skeleton
          animation="wave"
          height={500}
          sx={{ transform: 'none', width: '100%' }}
        />
      ) : status === 'FULFILLED' && orders ? (
        <OrdersList orders={orders} />
      ) : (
        <div className={styles.root__empty}>
          <Empty description={false} />
          <p>У вас еще нет заказов.</p>
        </div>
      )}
      <Pagination
        onChange={(_, page) => changePage(page)}
        count={
          count % AccountOrdersListSize === 0
            ? count / AccountOrdersListSize
            : parseInt(String(count / AccountOrdersListSize + 1))
        }
        sx={{
          justifyContent: 'center',
          display: 'flex',
          marginTop: '10px',
          ' button, .MuiPaginationItem-root': { color: Colors.$rootText },
        }}
      />
    </Stack>
  );
};

export default Orders;

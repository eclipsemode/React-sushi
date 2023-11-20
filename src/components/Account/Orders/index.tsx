import React from 'react';
import styles from './index.module.scss';
import { Pagination, Stack } from '@mui/material';
import OrdersList from '@components/OrdersList';
import { Empty } from 'antd';
import {
  AccountOrdersListSize,
  fetchOrdersByUserId,
  IFetchOrdersByUserId,
  IOrdersFetched,
} from '@store/features/account/api';
import Colors from '@shared/utils/Colors';
import { enqueueSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectUser } from '@store/features/user';

interface IProps {
  count: number;
}

const Orders = ({ count }: IProps) => {
  const dispatch = useAppDispatch();
  const [orders, setOrders] = React.useState<IOrdersFetched[]>();
  const { isAuth } = useAppSelector(selectUser);

  async function getOrders(page: number = 1) {
    try {
      const orders: IFetchOrdersByUserId = await dispatch(
        fetchOrdersByUserId({ page, size: AccountOrdersListSize }),
      ).unwrap();
      if (orders) {
        setOrders(orders.rows);
      }
    } catch (e) {
      enqueueSnackbar('Ошибка загрузки истории заказов', {
        variant: 'error',
      });
    }
  }

  React.useEffect(() => {
    if (isAuth) getOrders();
  }, [isAuth]);

  return (
    <Stack sx={{ width: '100%' }}>
      {
        orders && orders.length > 0
          ? <>
            <OrdersList orders={orders} />
            <Pagination
              onChange={(_, page) => getOrders(page)}
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
          </>
          : <div className={styles.root__empty}>
            <Empty description={false} />
            <p>У вас еще нет заказов.</p>
          </div>
      }
    </Stack>
  );
};

export default Orders;
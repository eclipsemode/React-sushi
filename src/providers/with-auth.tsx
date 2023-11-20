'use client';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { fetchAuth } from '@store/features/auth/api';
import { fetchUserInfo, selectUser } from '@store/features/user';
import { enqueueSnackbar } from 'notistack';

interface IProps {
  children: React.ReactNode;
}

const WithAuth = ({ children }: IProps) => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector(selectUser);
  const mounted = React.useRef(false);

  React.useEffect(() => {
    if (!mounted.current) {
      if (localStorage.getItem('accessToken')) {
        dispatch(fetchAuth());
      }
      mounted.current = true;
    }

    if (isAuth) {
      dispatch(fetchUserInfo())
        .unwrap()
        .then()
        .catch(() => {
          enqueueSnackbar('Ошибка загрузки данных пользователя', {
            variant: 'error',
          });
        });
    }

  }, [dispatch, isAuth]);

  return <>{children}</>;
};

export default WithAuth;

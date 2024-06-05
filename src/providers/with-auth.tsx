'use client';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { refreshToken, selectAuth } from '@store/features/auth/api';
import { getUserData } from '@store/features/user/api';
import { enqueueSnackbar } from 'notistack';

interface IProps {
  children: React.ReactNode;
}

const WithAuth = ({ children }: IProps) => {
  const dispatch = useAppDispatch();
  const { authUserId } = useAppSelector(selectAuth);
  const mounted = React.useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      dispatch(refreshToken());
    }

    mounted.current = true;
  }, []);

  useEffect(() => {
    if (authUserId) {
      dispatch(getUserData())
        .then()
        .catch(() => {
          enqueueSnackbar('Ошибка загрузки данных пользователя', {
            variant: 'error',
          });
        });
    }
  }, [authUserId]);

  return <>{children}</>;
};

export default WithAuth;

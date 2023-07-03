import React from 'react';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import { fetchAuth } from '@store/features/auth';
import {fetchUserInfo, selectUser} from "@store/features/user";
import {enqueueSnackbar} from "notistack";

const WithAuth = () => {
    const dispatch = useAppDispatch();
    const {isAuth} = useAppSelector(selectUser);

    React.useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            dispatch(fetchAuth());
        }
    }, [dispatch]);

    React.useEffect(() => {
        if (!!isAuth) {
            dispatch(fetchUserInfo()).unwrap().then().catch(() => {
                enqueueSnackbar('Ошибка загрузки данных пользователя', { variant: 'error' });
            })
        }
    }, [dispatch, isAuth])

    return <></>;
};

export default WithAuth;

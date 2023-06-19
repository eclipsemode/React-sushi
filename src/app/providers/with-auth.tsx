import React from 'react';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import { fetchAuth } from 'processes/services';
import {fetchUserInfo, selectUser} from "../../entities/user";
import {enqueueSnackbar} from "notistack";

const withAuth = (component: any) => () => {
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

    return component();
};

export default withAuth;

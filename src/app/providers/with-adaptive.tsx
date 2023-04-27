import React from 'react';
import { useAppDispatch } from '../hooks';
import { setCurrentWindowInnerWidth } from 'processes/services/adaptiveService/adaptiveService';

const withAdaptive = (component: any) => () => {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(setCurrentWindowInnerWidth(+window.innerWidth));
    }, [dispatch]);

    React.useEffect(() => {
        const dispatchFunc = () => {
            dispatch(setCurrentWindowInnerWidth(+window.innerWidth));
        };
        window.addEventListener('resize', dispatchFunc);

        return () => {
            window.removeEventListener('resize', dispatchFunc);
        };
    }, [dispatch]);

    return component();
};

export default withAdaptive;

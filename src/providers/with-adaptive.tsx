'use client';
import React from 'react';
import { useAppDispatch } from '@store/hooks';
import { setCurrentWindowInnerWidth } from '@store/features/adaptive';

interface IProps {
  children: React.ReactNode
}

const WithAdaptive = ({children}: IProps) => {
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

  return <>{children}</>;
};

export default WithAdaptive;

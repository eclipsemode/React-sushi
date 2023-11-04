'use client';
import React from 'react';
import { useAppDispatch } from '@store/hooks';
import { setCurrentWindowInnerWidth } from '@store/features/adaptive';

const WithAdaptive = () => {
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

  return <></>;
};

export default WithAdaptive;

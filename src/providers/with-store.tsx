import { store } from '@store/index';
import { Provider } from '@shared/lib/react-redux';
import React from 'react';

interface IProps {
  children: React.ReactNode;
}

const WithStore = ({ children }: IProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default WithStore;

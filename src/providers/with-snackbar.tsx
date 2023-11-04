import React from 'react';
import { SnackbarProvider } from '@lib/notistack';

interface IProps {
  children: React.ReactNode;
}

const WithSnackbar = ({ children }: IProps) => {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>;
};

export default WithSnackbar;

import React from 'react';
import { SnackbarProvider } from '@shared/lib/notistack';

interface IProps {
  children: React.ReactNode;
}

const WithSnackbar = ({ children }: IProps) => {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider> as React.ReactNode;
};

export default WithSnackbar;

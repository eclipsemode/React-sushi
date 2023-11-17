import React from 'react';
import WithAdaptive from '@providers/with-adaptive';
import WithAuth from '@providers/with-auth';
import WithStore from '@providers/with-store';
import WithPersist from '@providers/with-persist';
import WithSnackbar from '@providers/with-snackbar';
import FetchLocation from '@providers/with-location/fetchLocation';
import { composeReactComponents } from '@shared/utils/composeReactComponents';
import FetchCategories from '@providers/with-categories/fetchCategories';

interface IProps {
  children: React.ReactNode;
}

function Providers({ children }: IProps) {
  const Provider = composeReactComponents([
    WithStore,
    WithPersist,
    WithSnackbar,
    FetchCategories,
    FetchLocation,
    WithAdaptive,
    WithAuth
  ]);

  return (
    <Provider>
      {children}
    </Provider>
  );
}

export default Providers;

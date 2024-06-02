import React from 'react';
import WithAdaptive from '@providers/with-adaptive';
import WithAuth from '@providers/with-auth';
import WithStore from '@providers/with-store';
import WithPersist from '@providers/with-persist';
import WithSnackbar from '@providers/with-snackbar';
import GetLocation from '@providers/with-location/getLocation';
import { composeReactComponents } from '@shared/utils/composeReactComponents';
import GetCategories from '@providers/with-categories/getCategories';

interface IProps {
  children: React.ReactNode;
}

function Providers({ children }: IProps) {
  const Provider = composeReactComponents([
    WithStore,
    WithPersist,
    WithAuth,
    WithSnackbar,
    GetCategories,
    GetLocation,
    WithAdaptive,
  ]);

  return <Provider>{children}</Provider>;
}

export default Providers;

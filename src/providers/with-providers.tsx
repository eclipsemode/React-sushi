import React from 'react';
import WithAdaptive from '@providers/with-adaptive';
import WithAuth from '@providers/with-auth';
// import MaterialDialog from '@store/features/materialDialog/ui';
import WithStore from '@providers/with-store';
import WithPersist from '@providers/with-persist';
import WithSnackbar from '@providers/with-snackbar';
import FetchLocation from '@providers/with-location/fetchLocation';
import { composeReactComponents } from '@shared/utils/composeReactComponents';
import FetchCategories from '@providers/with-categories/fetchCategories';
// import composeScripts from '@shared/utils/composeScripts';

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

  // const Scripts = composeScripts([
  //   MaterialDialog
  // ])

  return (
    <Provider>
      {children}
    </Provider>
  );
}

export default Providers;

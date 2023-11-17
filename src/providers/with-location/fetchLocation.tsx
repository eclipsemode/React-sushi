import WithLocation from '@providers/with-location/index';
import { IBranches } from '@store/features/location/api';
import React from 'react';

async function getBranches(): Promise<IBranches[]> {
  const response = await fetch(`${process.env.REACT_APP_API_URL}api/branch`, {
    cache: 'no-store',
  });
  return response.json();
}

interface IProps {
  children: React.ReactNode
}

const FetchLocation = async ({children}: IProps) => {
  const branches = await getBranches();

  return <WithLocation branches={branches}>{children}</WithLocation>;
};

export default FetchLocation;

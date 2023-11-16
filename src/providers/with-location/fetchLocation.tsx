import WithLocation from '@providers/with-location/index';
import { cookies } from 'next/headers'
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
  const cookieStore = cookies()
  const branches = await getBranches();
  const locationInitialCookie = cookieStore.get('location-initial')

  return <WithLocation branches={branches} locationInitialCookie={locationInitialCookie}>{children}</WithLocation>;
};

export default FetchLocation;

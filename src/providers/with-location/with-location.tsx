import StoreLocation from '@providers/with-location/StoreLocation';
import { cookies } from 'next/headers'

async function getBranches() {
  const response = await fetch(`${process.env.REACT_APP_API_URL}api/branch`, {
    cache: 'no-store',
  });
  return response.json();
}

const WithLocation = async () => {
  const cookieStore = cookies()
  const branches = await getBranches();
  const locationInitialCookie = cookieStore.get('location-initial')

  return <StoreLocation branches={branches} locationInitialCookie={locationInitialCookie} />;
};

export default WithLocation;

'use client';
import React from 'react';

interface IData {
  postal_code: string;
  city: string;
  geo_lat: string;
  geo_lon: string;
  house: string;
  street: string;
}

export const usePosition = () => {
  const [latitude, setLatitude] = React.useState<number>();
  const [longitude, setLongitude] = React.useState<number>();
  const [error, setError] = React.useState<string | null>(null);
  const [data, setData] = React.useState<IData>();

  const onSuccess = ({ coords }: { coords: GeolocationCoordinates }) => {
    setLatitude(coords.latitude);
    setLongitude(coords.longitude);
  };

  const onError = (error: GeolocationPositionError) => {
    setError(error.message);
  };

  React.useEffect(() => {
    const geo = navigator.geolocation;

    if (!geo) {
      setError('Геолокация не поддерживается браузером');
      return;
    }

    geo.getCurrentPosition(onSuccess, onError);
  }, []);

  React.useEffect(() => {
    if (latitude && longitude) {
      (function () {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Token ' + process.env.DADATA_TOKEN,
            'X-Secret': `${process.env.DADATA_SECRET}`
          },
          body: JSON.stringify({ lat: latitude, lon: longitude }),
        };

        fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address', options)
          .then((response) => response.json())
          .then((result) => result.suggestions[0].data)
          .then((result: any) =>
            setData({
              postal_code: result.postal_code,
              city: result.city,
              geo_lat: result.geo_lat,
              geo_lon: result.geo_lon,
              house: result.house,
              street: result.street,
            })
          )
          .catch((error) => console.error(error));
      })();
    }
  }, [latitude, longitude]);

  return { ...data, error };
};

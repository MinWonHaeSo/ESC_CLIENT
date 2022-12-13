import ZERO_LOCATION from '@/constants/defaultLocation';
import sw from '@/lib/utils/customSweetAlert';
import { useState, useEffect } from 'react';

export type geoLocationType = {
  lat: string;
  lnt: string;
};

const useCurrentLocation = () => {
  const [geoLocation, setGeoLocation] = useState<geoLocationType>({ lat: ZERO_LOCATION.lat, lnt: ZERO_LOCATION.lnt });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setGeoLocation({ lat: String(latitude), lnt: String(longitude) });
        },
        error => {
          console.error(`geoLocation 에러 : ${error}`);
          sw.toast.error('다시 시도해 주세요.');
        },
      );
    } else {
      sw.toast.error('GPS를 지원하지 않습니다.');
    }
  }, []);

  return geoLocation;
};

export default useCurrentLocation;

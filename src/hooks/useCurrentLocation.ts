import ZERO_LOCATION from '@/constants/defaultLocation';
import sw from '@/lib/utils/customSweetAlert';
import { useState, useEffect } from 'react';

export type geoLocationType = {
  lat: string;
  lnt: string;
};

const useCurrentLocation = () => {
  const [geoLocation, setGeoLocation] = useState<geoLocationType>({ lat: ZERO_LOCATION.lat, lnt: ZERO_LOCATION.lnt });
  // 위치 서비스 기본값 ZERO BASE 주소

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setGeoLocation({ lat: String(latitude), lnt: String(longitude) });
      });
    } else {
      sw.toast.error('GPS를 지원하지 않습니다.');
    }
  }, []);

  return geoLocation;
};

export default useCurrentLocation;

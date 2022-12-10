import { useState, useEffect } from 'react';

export type geoLocationType = {
  lat: string;
  lnt: string;
}

const useCurrentLocation = () => {
  const [geoLocation, setGeoLocation] = useState<geoLocationType>({lat: '', lnt:''});

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log(`lat : ${position.coords.latitude} lnt: ${position.coords.longitude}`);
        setGeoLocation({ lat: String(latitude), lnt: String(longitude) });
      },
        (error) => {
          console.log(error);
      })
    } else {
      console.log('GPS를 지원하지 않습니다.');
    }
  }, [])
  
  return geoLocation
};

export default useCurrentLocation;



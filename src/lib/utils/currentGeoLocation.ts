export type geoLocationType = {
  lat: string;
  lnt: string;
};

const currentGeoLocation = () => {
  let lat: string
  let lnt: string

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      console.log(`lat : ${position.coords.latitude} lnt: ${position.coords.longitude}`);
          lat = String(latitude);
          lnt = String(longitude);
    },
      (error) => {
        console.log(error);
    })
  } else {
    console.log('GPS를 지원하지 않습니다.');
  }

  return { lat, lnt };
};

export default currentGeoLocation;

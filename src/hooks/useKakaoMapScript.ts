import { useEffect, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const useKakaoMapScript = (markerData: any) => {
  const [kakaoMap, setKakaoMap] = useState();

  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(37.62197524055062, 127.1583774403176),
      level: 4,
    };
    const map = new kakao.maps.Map(container, options);

    markerData.forEach((el: any) => {
      // 마커를 생성합니다
      const markers = new kakao.maps.Marker({
        //마커가 표시 될 지도
        map: map,
        //마커가 표시 될 위치
        position: new kakao.maps.LatLng(el.lat, el.lng),
        //마커에 hover시 나타날 title
        title: el.title,
      });

      kakao.maps.event.addListener(markers, 'click', function () {
        console.log(el);
      });
    });

    setKakaoMap(map);
  }, [markerData]);

  return kakaoMap;
};

export const mapPanTo = (map: any, location: any) => {
  const moveLatLon = new kakao.maps.LatLng(33.45058, 126.574942);

  map.panTo(moveLatLon);
};

export default useKakaoMapScript;

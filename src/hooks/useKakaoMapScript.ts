import { useEffect, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const useKakaoMapScript = () => {
  const [kakaoMap, setKakaoMap] = useState();

  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(37.5030426, 127.041588),
      level: 10,
    };
    const map = new kakao.maps.Map(container, options);
    
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    setKakaoMap(map);
  }, []);

  return kakaoMap;
};

export const geoCode = async (address: string) => {
  const geocoder = new kakao.maps.services.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.addressSearch(address, function (result:any, status:any) {
      if (status === kakao.maps.services.Status.OK) {
        resolve({ lat: result[0].y, lng: result[0].x });
      } else {
        reject(status);
      }
    });
  });
}

interface manPanToParam {
  map: any;
  location: { lat: string, lnt: string }
}

export const mapPanTo = ({ map, location }: manPanToParam) => {
  if(!map) return
  const moveLatLon = new kakao.maps.LatLng(location.lat, location.lnt);

  map.panTo(moveLatLon);
};

interface setMarkerParam {
  map: any;
  placeInfo: any;
  clickHandle: (el: any) => void;
}

export const setMarker = ({ map, placeInfo, clickHandle }: setMarkerParam) => {
  useEffect(() => {
  if (!placeInfo) return;

    placeInfo.forEach((el: any) => {
      // 마커를 생성합니다
      const markers = new kakao.maps.Marker({
        //마커가 표시 될 지도
        map: map,
        //마커가 표시 될 위치
        position: new kakao.maps.LatLng(el.lat, el.lnt),
        //마커에 hover시 나타날 title
        title: el.title,
      });

      kakao.maps.event.addListener(markers, 'click', function () {
        clickHandle(el);
      });
    });

    mapPanTo({ map, location: {lat: placeInfo[0].lat, lnt: placeInfo[0].lnt} });
  },[placeInfo] )
};

export default useKakaoMapScript;

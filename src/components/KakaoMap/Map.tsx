import React, { useEffect } from 'react';
import useKakaoMapScript, { setMarker } from '@/hooks/useKakaoMapScript';

interface MapProps {
  searchResults: any;
  onClickMarker: (el: any) => void;
}

const Map = ({ searchResults, onClickMarker }: MapProps) => {
  const kakaoMap = useKakaoMapScript();
  setMarker({ map: kakaoMap, placeInfo: searchResults, clickHandle: onClickMarker });

  return (
    <div>
      <div
        id="myMap"
        style={{
          width: '100vw',
          height: 'calc(100vh - 5rem)',
        }}
      ></div>
    </div>
  );
};

export default Map;

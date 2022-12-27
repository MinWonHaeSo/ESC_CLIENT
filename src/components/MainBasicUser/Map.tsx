import React, { useEffect } from 'react';
import kakaoService from '@/service/kakaoMapService';

interface MapProps {
  searchResults: any;
  onClickMarker: (el: any) => void;
}

const Map = ({ searchResults, onClickMarker }: MapProps) => {
  useEffect(() => {
    kakaoService.initScript();
  }, []);

  useEffect(() => {
    kakaoService.setMarker({ place: searchResults, handleClick: onClickMarker });
  }, [searchResults]);

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

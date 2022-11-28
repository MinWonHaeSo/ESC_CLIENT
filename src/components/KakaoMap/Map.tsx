import React, { useEffect, useState } from 'react';
import useKakaoMapScript from '@/hooks/useKakaoMapScript';
import MarkerStadiumInfo from './MarkerStadiumInfo';

interface MapProps {
  markerData: any;
}

const Map = ({ markerData }: MapProps) => {
  const kakaoMap = useKakaoMapScript(markerData);

  return (
    <div>
      <div
        id="myMap"
        style={{
          width: '100vw',
          height: '100vh',
        }}
      ></div>
    </div>
  );
};

export default Map;

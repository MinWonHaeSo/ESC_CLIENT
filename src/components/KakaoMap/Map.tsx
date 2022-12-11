import React, { useCallback, useEffect } from 'react';
import useKakaoMapScript, { mapPanTo, setMarker } from '@/hooks/useKakaoMapScript';
import kakaoClass from '@/lib/utils/kakaoMapClass';

interface MapProps {
  searchResults: any;
  onClickMarker: (el: any) => void;
}

const Map = ({ searchResults, onClickMarker }: MapProps) => {

  useEffect(() => {
    kakaoClass.initScript();
  }, [])
  
  useEffect(() => {
    kakaoClass.setMarker({place: searchResults, handleClick: onClickMarker});
  },[searchResults])

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

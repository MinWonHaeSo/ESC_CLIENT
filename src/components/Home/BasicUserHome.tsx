import React, { useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import Map from '../KakaoMap/Map';
import MarkerStadiumInfo from '../Stardium/MarkerStadiumInfo';
import StardiumSearch from '../Stardium/StardiumSearch';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useDispatch } from 'react-redux';
import { clearMarkerInfo, clickMarker } from '@/store/stardiumSlice';
import { useGetStadiumListQuery } from '@/api/stardiumApi';

interface BasicUserHomeProps {
  currentLocation: { lat: string; lnt: string };
};

const BasicUserHome = ({ currentLocation }: BasicUserHomeProps) => {
  const { data } = useGetStadiumListQuery(currentLocation);
  const { searchResults, markerInfo } = useSelector((state: RootState) => state.stardium);
  const dispatch = useDispatch();

  const handleClickMarker = useMemo(
    () => (el: any) => {
      dispatch(clickMarker(el));
    },
    [dispatch],
  );

  useEffect(() => {
    return () => {
      dispatch(clearMarkerInfo());
    };
  }, []);

  return (
    <HomeWrapper>
      <Map
        searchResults={searchResults.length === 0 ? data : searchResults}
        onClickMarker={handleClickMarker} />
      <StardiumSearch />
      <MarkerStadiumInfo markerInfo={markerInfo} />
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div`
  position: absolute;
`;

export default BasicUserHome;

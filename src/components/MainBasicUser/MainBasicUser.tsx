import React, { useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import Map from './Map';
import MarkerStadiumInfo from './MarkerStadiumInfo';
import StadiumSearch from './StadiumSearch';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useDispatch } from 'react-redux';
import { clearMarkerInfo, clickMarker } from '@/store/stadiumMarkerSlice';
import { useGetStadiumListQuery } from '@/api/stadiumApi';

interface MainBasicUserProps {
  currentLocation: { lat: string; lnt: string };
}

const MainBasicUser = ({ currentLocation }: MainBasicUserProps) => {
  const { data } = useGetStadiumListQuery(currentLocation);
  const { searchResults, markerInfo } = useSelector((state: RootState) => state.stadiumMarker);
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
      <Map searchResults={searchResults.length === 0 ? data : searchResults} onClickMarker={handleClickMarker} />
      <StadiumSearch />
      <MarkerStadiumInfo markerInfo={markerInfo} />
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div`
  position: absolute;
`;

export default MainBasicUser;
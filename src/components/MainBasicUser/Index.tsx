import React, { useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { clearMarkerInfo, clickMarker } from '@/store/stadiumMarkerSlice';
import { useGetStadiumListQuery } from '@/api/stadiumApi';
import { RootState } from '@/store/store';
import MarkerStadiumInfo from './MarkerStadiumInfo';
import StadiumSearch from './StadiumSearch';
import Map from './Map';

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

  console.log(markerInfo);

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

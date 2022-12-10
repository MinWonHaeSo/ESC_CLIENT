import React, { useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import Map from '../KakaoMap/Map';
import MarkerStadiumInfo from '../Stardium/MarkerStadiumInfo';
import StardiumSearch from '../Stardium/StardiumSearch';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useDispatch } from 'react-redux';
import { clearMarkerInfo, clickMarker } from '@/store/stardiumSlice';
import { useGetStardiumListQuery } from '@/api/stardiumApi';
import axios from 'axios';

interface BasicUserHomeProps {
  currentLocation: { lat: string; lnt: string };
};
const BASE_URL = import.meta.env.VITE_API_SERVER;

const BasicUserHome = ({ currentLocation }: BasicUserHomeProps) => {
  // const { data } = useGetStardiumListQuery(currentLocation);
  const { searchResults, markerInfo } = useSelector((state: RootState) => state.stardium);
  const dispatch = useDispatch();

  const handleClickMarker = useMemo(
    () => (el: any) => {
      dispatch(clickMarker(el));
    },
    [dispatch],
  );

  useEffect(() => {
    axios.get(`/stadiums/near-loc?lnt=${127}&lat=${32}`)

    // fetch(`${BASE_URL}/stadium/near-loc?lnt=${127}&lat=${32}`, {
    //   method: 'GET'
    // }).then((res) => {
    //   console.log(res)
    // }).catch((err) => {
    //   console.log(err);
    // })
  },[])

  useEffect(() => {
    return () => {
      dispatch(clearMarkerInfo());
    };
  }, []);

  return (
    <HomeWrapper>
      <Map searchResults={searchResults} onClickMarker={handleClickMarker} />
      <StardiumSearch />
      <MarkerStadiumInfo markerInfo={markerInfo} />
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div`
  position: absolute;
`;

export default BasicUserHome;

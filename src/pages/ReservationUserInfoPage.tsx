import React from 'react';
import ReservationUserInfo from '@/components/ReservationUserInfo/Index';
import { useLocation } from 'react-router-dom';

type MyLocationState = {
  id: string;
};

const ReservationUserInfoPage = () => {
  const location = useLocation();
  const state = location.state as MyLocationState;

  return <ReservationUserInfo id={state.id} />;
};

export default ReservationUserInfoPage;

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import sw from '@/lib/utils/customSweetAlert';
import Reservation from '@/components/StadiumReservation/Reservation';

type MyLocationState = {
  id: string;
};

const StadiumReservationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as MyLocationState;

  if (!state.id) {
    sw.toast.error('잘못된 경로 요청입니다.');
    navigate(-1);
  }

  return <Reservation id={state.id} />;
};

export default StadiumReservationPage;

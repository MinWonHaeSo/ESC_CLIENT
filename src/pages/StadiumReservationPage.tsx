import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import sw from '@/lib/utils/customSweetAlert';
import Reservation from '@/components/StadiumReservation/Index';
import { useGoBack } from '@/hooks/useGoBack';

type MyLocationState = {
  id: string;
};

const StadiumReservationPage = () => {
  const location = useLocation();
  const goback = useGoBack();

  const state = location.state as MyLocationState;

  if (!state.id) {
    sw.toast.error('잘못된 경로 요청입니다.');
    goback();
  }

  return <Reservation id={state.id} />;
};

export default StadiumReservationPage;

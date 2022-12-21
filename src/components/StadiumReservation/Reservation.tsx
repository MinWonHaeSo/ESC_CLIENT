import { useGetReservationStadiumTimeQuery } from '@/api/reservationApi';
import { RootState } from '@/store/store';
import React from 'react';
import { useSelector } from 'react-redux';
import StepComponentProcess from '../common/StepComponentProcess';
import ReservationStepOne from './ReservationStepOne';
import ReservationStepThree from './ReservationStepThree';
import ReservationStepTwo from './ReservationStepTwo';

interface ReservationProps {}

const Reservation = (props: ReservationProps) => {
  const { data } = useGetReservationStadiumTimeQuery('1');
  const step = useSelector((state: RootState) => state.stadiumReservation.step);

  // Page Component에서 GET API 후 Data Slice 에 저장 하기.
  // 각각의 컴포넌트에서 useSelector 호출 하여 Slice 참조.
  const reservationComponent = [
    { step: 1, component: <ReservationStepOne /> },
    { step: 2, component: <ReservationStepTwo /> },
    { step: 3, component: <ReservationStepThree /> },
  ];

  return <StepComponentProcess {...reservationComponent.find(component => component.step === step)} />;
};

export default Reservation;

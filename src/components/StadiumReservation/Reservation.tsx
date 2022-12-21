import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetReservationStadiumTimeQuery } from '@/api/reservationApi';
import sw from '@/lib/utils/customSweetAlert';
import Loading from '../common/Loading/Loading';
import StepComponentProcess from '../common/StepComponentProcess';
import ReservationStepOne from './ReservationStepOne';
import ReservationStepThree from './ReservationStepThree';
import ReservationStepTwo from './ReservationStepTwo';

interface ReservationProps {
  id: string;
}

const Reservation = ({ id }: ReservationProps) => {
  const { data, isLoading, isError } = useGetReservationStadiumTimeQuery({ id });
  const step = useSelector((state: RootState) => state.stadiumReservation.step);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    sw.toast.error('통신중 오류 발생. 다시 시도 해 주세요.');
    return null;
  }

  const reservationComponent = [
    { step: 1, component: <ReservationStepOne data={data!} /> },
    { step: 2, component: <ReservationStepTwo /> },
    { step: 3, component: <ReservationStepThree /> },
  ];

  return <StepComponentProcess {...reservationComponent.find(component => component.step === step)} />;
};

export default Reservation;

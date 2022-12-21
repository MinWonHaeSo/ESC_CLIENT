import React from 'react';
import styled from '@emotion/styled';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import Title from '../common/atoms/Title';
import Responsive from '../common/Responsive';
import ReservationButton from './ReservationButton';
import ReservationPrevStepButton from './ReservationPrevStepButton';
import ReservationRentalList from './ReservationRentalList';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface ReservationStepTwoProps {}

const ReservationStepTwo = ({}: ReservationStepTwoProps) => {
  const rentalItems = useSelector((state: RootState) => state.stadiumReservation.data.items);

  return (
    <ReservationContainer>
      <div className="title-container">
        <ReservationPrevStepButton />
        <Title fontSize={typo.large}>체육관 예약</Title>
      </div>
      <h4 className="sub-title">(대여 상품)</h4>
      <ReservationRentalList rentalItems={rentalItems} />
      <ReservationButton />
    </ReservationContainer>
  );
};

const ReservationContainer = styled.div`
  ${Responsive.ResponsiveWrapper}
  margin-top: 1rem;

  .title-container {
    display: flex;
    gap: 1rem;
  }

  .sub-title {
    color: ${palette.grey[300]};
  }
`;

export default ReservationStepTwo;

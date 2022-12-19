import React from 'react';
import styled from '@emotion/styled';
import { typo } from '@/lib/styles/typo';
import Title from '../common/atoms/Title';
import Responsive from '../common/Responsive';
import palette from '@/lib/styles/palette';

interface ReservationProps {}

const Reservation = (props: ReservationProps) => {
  return (
    <ReservationContainer>
      <Title fontSize={typo.large}>체육관 예약</Title>
      <h4 className="sub-title">(날짜, 시간, 인원)</h4>
    </ReservationContainer>
  );
};

const ReservationContainer = styled.div`
  ${Responsive.ResponsiveWrapper}
  margin-top: 1rem;

  .sub-title {
    color: ${palette.grey[300]};
  }
`;

export default Reservation;

import React from 'react';
import styled from '@emotion/styled';
import { typo } from '@/lib/styles/typo';
import palette from '@/lib/styles/palette';
import Title from '../common/atoms/Title';
import Responsive from '../common/Responsive';
import ReservationPerson from './ReservationPerson';
import ReservationTime from './ReservationTime';
import ReservationDate from './ReservationDate';
import ReservationButton from './ReservationButton';
import ReservationAccordion from './ReservationAccordion';
import TImeSelectList from './TImeSelectList';

interface ReservationStepOneProps {}

const ReservationStepOne = (props: ReservationStepOneProps) => {
  return (
    <ReservationContainer>
      <Title fontSize={typo.large}>체육관 예약</Title>
      <h4 className="sub-title">(날짜, 시간, 인원)</h4>
      <ReservationInfo>
        <ReservationDate />
        <ReservationAccordion component={<TImeSelectList />} />
        <ReservationPerson />
      </ReservationInfo>
      <ReservationButton />
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

const ReservationInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  .react-datepicker-popper {
    right: -1rem !important;
    left: 1rem !important;
  }

  .react-datepicker {
    width: 92%;
  }

  .react-datepicker__month-container {
    width: 100%;
  }

  .react-datepicker__time-container {
    width: 100%;
    .react-datepicker__time-box {
      width: 100%;
    }
  }
`;

export default ReservationStepOne;

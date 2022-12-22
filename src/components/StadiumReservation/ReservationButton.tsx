import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import palette from '@/lib/styles/palette';
import { nextStep } from '@/store/stadiumReservationSlice';
import { RootState } from '@/store/store';
import Button from '../common/atoms/Button';

interface ReservationButtonProps {}

const ReservationButton = (props: ReservationButtonProps) => {
  const step = useSelector((state: RootState) => state.stadiumReservation.step);
  const dispatch = useDispatch();

  const handleNextStep = useCallback(() => {
    dispatch(nextStep(step + 1));
  }, [dispatch]);

  return (
    <ReservationButtonContainer>
      <Button backgroundColor={palette.black[200]} size={'large'} type={'button'} onClick={handleNextStep}>
        다음
      </Button>
    </ReservationButtonContainer>
  );
};
const ReservationButtonContainer = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

export default ReservationButton;

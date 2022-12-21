import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { nextStep } from '@/store/stadiumReservationSlice';
import styled from '@emotion/styled';
import { typo } from '@/lib/styles/typo';

interface ReservationPrevStepButtonProps {}

const ReservationPrevStepButton = (props: ReservationPrevStepButtonProps) => {
  const step = useSelector((state: RootState) => state.stadiumReservation.step);
  const dispatch = useDispatch();

  const handleGoToPrevStep = useCallback(() => {
    dispatch(nextStep(step - 1));
  }, [dispatch]);

  return (
    <ReservationPrevStepButtonContainer onClick={handleGoToPrevStep}>
      <i className="fa-solid fa-angle-left"></i>
    </ReservationPrevStepButtonContainer>
  );
};

const ReservationPrevStepButtonContainer = styled.button`
  i {
    font-size: ${typo.large};
  }
`;

export default ReservationPrevStepButton;

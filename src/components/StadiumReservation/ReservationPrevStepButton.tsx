import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { nextStep } from '@/store/stadiumReservationSlice';
import styled from '@emotion/styled';
import { typo } from '@/lib/styles/typo';
import palette from '@/lib/styles/palette';

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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border: 1px solid ${palette.black[200]};
  border-radius: 50%;
  i {
    font-size: ${typo.medium};
  }
`;

export default ReservationPrevStepButton;

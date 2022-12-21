import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { typo } from '@/lib/styles/typo';
import { changeCount } from '@/store/stadiumReservationSlice';

interface ReservationPersonProps {}

const ReservationPerson = (props: ReservationPersonProps) => {
  const count = useSelector((state: RootState) => state.stadiumReservation.data.headCount);
  const dispatch = useDispatch();

  const handlePlus = useCallback(() => {
    dispatch(changeCount(count + 1));
  }, [dispatch, count]);

  const handleMinus = useCallback(() => {
    if (!count) return;
    dispatch(changeCount(count - 1));
  }, [dispatch, count]);

  return (
    <SelectContainer>
      <span>인원</span>
      <CountContainer>
        <CountButton onClick={handleMinus}>-</CountButton>
        <span>{count}</span>
        <CountButton onClick={handlePlus}>+</CountButton>
      </CountContainer>
    </SelectContainer>
  );
};

const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-radius: 10px;
  border: 1px solid gray;
  height: 60px;
  padding: 1rem;
  font-size: ${typo.medium};
`;

const CountContainer = styled.div`
  display: flex;
  gap: 1rem;
  height: 30px;
  align-items: center;
  justify-content: center;
`;

const CountButton = styled.button`
  width: 35px;
  border: 1px solid black;
  border-radius: 10px;
  scale: 1.4;
`;
export default ReservationPerson;

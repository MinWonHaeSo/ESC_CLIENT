import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { changeCount } from '@/store/stadiumReservationSlice';
import { RootState } from '@/store/store';
import { typo } from '@/lib/styles/typo';
import palette from '@/lib/styles/palette';

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
        <CountButton onClick={handleMinus}>
          <i className="fa-solid fa-minus" />
        </CountButton>
        <span>{count}</span>
        <CountButton onClick={handlePlus}>
          <i className="fa-solid fa-plus" />
        </CountButton>
      </CountContainer>
    </SelectContainer>
  );
};

const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  width: 32px;
  height: 24px;
  border: 1px solid ${palette.grey[300]};
  border-radius: 10px;
  &:active {
    border: 1px solid ${palette.black[200]};
  }

  i {
    font-size: ${typo.small};
  }
`;
export default ReservationPerson;

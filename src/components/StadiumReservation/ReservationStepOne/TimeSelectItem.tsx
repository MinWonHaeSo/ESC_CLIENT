import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectDate } from '@/store/stadiumReservationSlice';
import { RootState } from '@/store/store';
import palette from '@/lib/styles/palette';

interface TimeSelectItemProps {
  times: string[];
  reservedTimes: string[];
}

const TimeSelectItem = ({ times, reservedTimes }: TimeSelectItemProps) => {
  const selectedDate = useSelector((state: RootState) => state.stadiumReservation.data.reservingTimes);
  const dispatch = useDispatch();

  const handleSelectTime = useCallback(
    (date: string) => {
      dispatch(selectDate(date));
    },
    [dispatch],
  );

  return (
    <TimeSelectItemContainer>
      {times.map(time => (
        <DateButtonContainer key={time}>
          <button
            className={`${selectedDate.includes(time) ? 'btn btn-seleted' : 'btn btn-actived'}`}
            onClick={() => handleSelectTime(time)}
            disabled={reservedTimes.includes(time)}
          >
            {time}
          </button>
        </DateButtonContainer>
      ))}
    </TimeSelectItemContainer>
  );
};

const TimeSelectItemContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin: 1rem 0;
`;

const DateButtonContainer = styled.div`
  display: flex;
  height: 40px;
  justify-content: center;

  .btn {
    width: 100%;
    font-size: 20px;
    color: #000;
  }

  .btn-seleted {
    background-color: #fff570;
    border: 1px solid ${palette.primary.orange};
  }

  .btn:disabled {
    background-color: ${palette.grey[100]};
    border: 1px solid ${palette.grey[300]};
    color: ${palette.grey[400]};
  }

  .btn-actived {
    background-color: #edfadc;
    border: 1px solid #cfe1bd;
  }
`;

export default TimeSelectItem;

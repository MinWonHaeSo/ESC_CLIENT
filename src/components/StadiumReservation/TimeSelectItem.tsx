import React, { useCallback } from 'react';
import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { selectDate } from '@/store/stadiumReservationSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface TimeSelectItemProps {
  times: string[];
  reservedTimes: string[];
}

const TimeSelectItem = ({ times, reservedTimes }: TimeSelectItemProps) => {
  const selectedDate = useSelector((state: RootState) => state.stadiumReservation.data.reservingTimes);
  const dispatch = useDispatch();
  // timeDivedesDate || selectedDate 로 className 비교

  const handleSelectTime = useCallback(
    (date: string) => {
      dispatch(selectDate(date));
    },
    [dispatch],
  );

  return (
    <TimeSelectItemContainer>
      {times.map(time =>
        reservedTimes.includes(time) ? null : (
          <DateButtonContainer key={time}>
            <button
              className={`${selectedDate.includes(time) ? 'btn btn-disabled' : 'btn btn-actived'}`}
              onClick={() => handleSelectTime(time)}
            >
              {time}
            </button>
          </DateButtonContainer>
        ),
      )}
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

  .btn-disabled {
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

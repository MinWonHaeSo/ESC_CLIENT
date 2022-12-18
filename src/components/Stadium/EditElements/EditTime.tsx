import React from 'react';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';
import Label from '@/components/common/atoms/Label';
import CustomDatePicker from '@/components/common/CustomDatePicker';
import useDatepickerTIme from '@/hooks/useDatepickerTIme';
import useDefaultTime from '@/hooks/useDefaultTime';
import { changeTimes } from '@/store/stadiumWriteSlice';
import { useDispatch } from 'react-redux';

interface EditStadiumTimeProps {
  startTime: string;
  endTime: string;
}

const timeFormatterZero = (time: number) => (time < 10 ? '0' + String(time) : time);

const EditStadiumTime = ({ startTime, endTime }: EditStadiumTimeProps) => {
  const startDate = useDefaultTime(startTime);
  const endDate = useDefaultTime(endTime);
  const includeTime = useDatepickerTIme(startDate.getHours());
  const dispatch = useDispatch();

  const handleChangeStartTime = (date: Date) => {
    dispatch(
      changeTimes({
        name: 'openTime',
        time: `${timeFormatterZero(date.getHours())}:${timeFormatterZero(date.getMinutes())}`,
      }),
    );
  };

  const handleChangeEndTime = (date: Date) => {
    dispatch(
      changeTimes({
        name: 'closeTime',
        time: `${timeFormatterZero(date.getHours())}:${timeFormatterZero(date.getMinutes())}`,
      }),
    );
  };

  return (
    <StadiumTimeContainer>
      <Label htmlFor="" required={true}>
        * 운영시간
      </Label>
      <div className="stadium-wrapper">
        <div>
          <div>
            <span>시작시간</span>
          </div>
          <CustomDatePicker value={startDate} onChange={handleChangeStartTime} />
        </div>
        <div>
          <span>종료시간</span>
          <CustomDatePicker value={endDate} onChange={handleChangeEndTime} includeTimes={includeTime} />
        </div>
      </div>
    </StadiumTimeContainer>
  );
};

const StadiumTimeContainer = styled.div`
  display: flex;
  flex-direction: column;

  .stadium-wrapper {
    display: flex;
    gap: 1rem;
    width: 280px;

    span {
      font-size: ${typo.micro};
    }
    input {
      padding: 0.2rem 0.5rem;
      width: 130px;
      border: 1px solid ${palette.grey[400]};
      text-align: center;

      &:focus {
        border-color: ${palette.primary.point};
      }
    }
  }
`;

export default React.memo(EditStadiumTime);

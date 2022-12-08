import React from 'react';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';
import Label from '@/components/common/atoms/Label';
import CustomDatePicker from '@/components/common/CustomDatePicker';
import datepickerTime from '@/lib/utils/datepickerTIme';
import useDefaultTime from '@/hooks/useDefaultTime';
import { changeTimes, timeType } from '@/store/stardiumWriteSlice';
import { useDispatch } from 'react-redux';

interface StardiumTimeProps {
  startTime: timeType;
  endTime: timeType;
};

const StardiumTime = ({ startTime, endTime }: StardiumTimeProps) => {
  const startDate = useDefaultTime(startTime.hh, startTime.mm)
  const endDate = useDefaultTime(endTime.hh, endTime.mm)
  const includeTime = datepickerTime(startDate.getHours());
  const dispatch = useDispatch();

  const handleChangeStartTime = (date: Date) => {
    const hh = date.getHours();
    const mm = date.getMinutes();
    dispatch(changeTimes({ name: 'startTime', hh, mm }));
  }

  const handleChangeEndTime = (date: Date) => {
    const hh = date.getHours();
    const mm = date.getMinutes();
    dispatch(changeTimes({ name: 'endTime', hh, mm }));
  }

  return (
    <StardiumTimeContainer>
      <Label htmlFor="" required={true}>
        * 운영시간
      </Label>
      <div className="stardium-wrapper">
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
    </StardiumTimeContainer>
  );
};

const StardiumTimeContainer = styled.div`
  display: flex;
  flex-direction: column;

  .stardium-wrapper {
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

export default React.memo(StardiumTime);

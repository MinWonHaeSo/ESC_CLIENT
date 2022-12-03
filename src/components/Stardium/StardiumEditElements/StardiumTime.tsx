import React, { useState } from 'react';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';

import Label from '@/components/common/atoms/Label';
import CustomDatePicker from '@/components/common/CustomDatePicker';
import datepickerTime from '@/lib/utils/datepickerTIme';

type Props = {};

const StardiumTime = (props: Props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const includeTime = datepickerTime(startDate.getHours());

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
          <CustomDatePicker value={startDate} onChange={setStartDate} />
        </div>
        <div>
          <span>종료시간</span>
          <CustomDatePicker value={endDate} onChange={setEndDate} includeTimes={includeTime} />
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
export default StardiumTime;

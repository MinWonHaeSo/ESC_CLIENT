import React, { useState } from 'react';
import styled from '@emotion/styled';
import CustomDate from '../common/CustomDate';
import { addDays } from 'date-fns';

interface ReservationDateProps {}

const ReservationDate = (props: ReservationDateProps) => {
  const [date, setDate] = useState(new Date());

  return (
    <CustomDate
      value={date}
      onChange={date => setDate(date)}
      excludeDays={[addDays(new Date(), 1), addDays(new Date(), 5)]}
      customInput={<CustomInput />}
    />
  );
};

const CustomInput = styled.input`
  width: 100%;
  padding: 1rem 1rem;
  border-radius: 10px;
  background-color: white;
  height: 60px;
  font-size: 20px;
  border: 1px solid grey;
`;

export default ReservationDate;

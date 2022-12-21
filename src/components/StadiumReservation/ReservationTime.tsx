import React, { useState } from 'react';
import styled from '@emotion/styled';
import CustomTime from '../common/CustomTime';

interface RserevationTimeProps {}

const RserevationTime = (props: RserevationTimeProps) => {
  const [time, setTime] = useState(new Date());

  return <CustomTime value={time} onChange={date => setTime(date!)} customInput={<CustomInput />} />;
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

export default RserevationTime;

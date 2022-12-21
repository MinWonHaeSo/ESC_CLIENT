import React, { useState } from 'react';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';

interface ReservationPersonProps {}

const ReservationPerson = (props: ReservationPersonProps) => {
  const [count, setCount] = useState(0);

  const handlePlus = () => {
    setCount(prev => prev + 1);
  };

  const handleMinus = () => {
    if (!count) return;
    setCount(prev => prev - 1);
  };

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

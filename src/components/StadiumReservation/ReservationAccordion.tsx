import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import { RootState } from '@/store/store';

interface ReservationAccordionProps {
  component: React.ReactNode;
}

const ReservationAccordion = ({ component }: ReservationAccordionProps) => {
  const [open, setOpen] = useState(false);
  const selectedDate = useSelector((state: RootState) => state.stadiumReservation.data.reservingTimes);

  const handleArccodionToggle = () => {
    setOpen(prev => !prev);
  };

  return (
    <>
      <ReservationAccordionContainer>
        {selectedDate.length === 0 ? '시간 선택' : selectedDate.join(', ')}
        <AccordionToggle onClick={handleArccodionToggle}>
          <i
            className="fa-solid fa-chevron-right"
            style={open ? { transform: 'rotate(-90deg)' } : { transform: 'rotate(90deg)' }}
          ></i>
        </AccordionToggle>
      </ReservationAccordionContainer>
      {open ? component : null}
    </>
  );
};

const ReservationAccordionContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  width: 100%;
  min-height: 60px;
  padding: 1rem;
  padding-right: 5rem;
  border-radius: 10px;
  border: 1px solid gray;
  font-size: ${typo.medium};
`;

const AccordionToggle = styled.button`
  position: absolute;
  width: 40px;
  height: 40px;
  top: 50%;
  bottom: 0;
  right: 10px;
  border-radius: 50%;
  border: 1px solid ${palette.grey[400]};
  transform: translate(0, -50%);

  i {
    font-size: 18px;
    color: ${palette.grey[400]};
    transition: all 0.3s;
  }
`;
export default ReservationAccordion;

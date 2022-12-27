import { useState } from 'react';
import styled from '@emotion/styled';
import { RentalItemsToggleType } from '@/store/stadiumReservationSlice';
import { typo } from '@/lib/styles/typo';
import palette from '@/lib/styles/palette';
import ReservationRentalItem from '../ReservationStepThree/ReservationRentalItem';
import AccordionToggleButton from '../ReservationStepThree/ToggleButton';
import StyledSeparateLine from '../ReservationStepThree/StyledSerparateLine';

interface ReservationRentalItemListProps {
  rentalItems: RentalItemsToggleType[];
  step: number;
}

const ReservationRentalItemList = ({ rentalItems, step }: ReservationRentalItemListProps) => {
  const [rentalItemOpen, setRentalItemOpen] = useState<boolean>(false);
  const handleRentalItemToggle = () => {
    setRentalItemOpen(prev => !prev);
  };

  const selectedRentalItemsCount = rentalItems.reduce((acc, curr) => {
    if (curr.toggle === true) {
      acc += curr.count;
    }
    return acc;
  }, 0);

  return (
    <ReservationRentalItemListBlock>
      <TitleWrapper>
        <h2>대여 용품</h2>
        <div>
          <RentalItemTotalCount>
            총&nbsp;<span>{selectedRentalItemsCount}</span>개
          </RentalItemTotalCount>
          <AccordionToggleButton open={rentalItemOpen} onAccordionToggle={handleRentalItemToggle} />
        </div>
      </TitleWrapper>
      <StyledSeparateLine />
      <RentalItemList open={rentalItemOpen}>
        {rentalItems.map(item => item.toggle && <ReservationRentalItem key={item.id} item={item} step={step} />)}
      </RentalItemList>
    </ReservationRentalItemListBlock>
  );
};

export default ReservationRentalItemList;

const ReservationRentalItemListBlock = styled.div`
  margin-bottom: 12px;
  padding: 12px;
  border: 1px solid ${palette.grey[200]};
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    align-items: center;
  }
`;

const RentalItemList = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  flex-direction: column;
`;

const RentalItemTotalCount = styled.div`
  /* font-size: ${typo.base}; */
  display: inline-block;
  margin-right: 8px;

  span {
    color: ${palette.primary['green']};
    font-size: ${typo.medium};
    font-weight: 500;
  }
`;

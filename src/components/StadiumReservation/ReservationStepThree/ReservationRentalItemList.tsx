import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import { RentalItemsToggleType } from '@/store/stadiumReservationSlice';
import styled from '@emotion/styled';
import ReservationRentalItem from '../ReservationRentalItem';
import AccordionToggleButton from './ToggleButton';
import StyledSeparateLine from './StyledSerparateLine';

interface ReservationRentalItemListProps {
  rentalItemOpen: boolean;
  onRentalItemToggle: () => void;
  rentalItems: RentalItemsToggleType[];
  step: number;
}

const ReservationRentalItemList = ({
  rentalItemOpen,
  onRentalItemToggle,
  rentalItems,
  step,
}: ReservationRentalItemListProps) => {
  return (
    <ReservationRentalItemListBlock>
      <TitleWrapper>
        <h2>대여 용품</h2>
        <div>
          <RentalItemTotalCount>
            총&nbsp;<span>{rentalItems.length}</span>개
          </RentalItemTotalCount>
          <AccordionToggleButton open={rentalItemOpen} onAccordionToggle={onRentalItemToggle} />
        </div>
      </TitleWrapper>
      <StyledSeparateLine />
      <RentalItemList open={rentalItemOpen}>
        {rentalItems.map(item => (
          <ReservationRentalItem key={item.id} item={item} step={step} />
        ))}
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

    div {
      display: inline-block;
      margin-right: 8px;

      span {
        color: ${palette.primary['green']};
        font-size: ${typo.base};
        font-weight: 500;
      }
    }
  }
`;

const RentalItemList = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? 'flex' : 'none')};
`;

const RentalItemTotalCount = styled.div`
  font-size: ${typo.base};
`;

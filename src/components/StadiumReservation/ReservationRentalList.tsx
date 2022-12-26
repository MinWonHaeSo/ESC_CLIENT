import styled from '@emotion/styled';
import { RentalItemsType } from '@/api/reservationApi';
import ReservationRentalItem from './ReservationRentalItem';

interface ReservationRentalListProps {
  rentalItems: RentalItemsType[];
}

const ReservationRentalList = ({ rentalItems }: ReservationRentalListProps) => {
  return (
    <ReservationRentalListContainer>
      {rentalItems.map(item => (
        <ReservationRentalItem key={item.id} item={item} />
      ))}
    </ReservationRentalListContainer>
  );
};

const ReservationRentalListContainer = styled.div`
  height: 380px;
  margin-top: 0.5rem;
  padding: 4px 8px;
  overflow-y: scroll;
`;

export default ReservationRentalList;

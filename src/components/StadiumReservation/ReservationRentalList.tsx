import React from 'react';
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
  height: 400px;
  padding: 1rem 0.5rem;
  overflow-y: scroll;
  margin-top: 1rem;
`;

export default ReservationRentalList;

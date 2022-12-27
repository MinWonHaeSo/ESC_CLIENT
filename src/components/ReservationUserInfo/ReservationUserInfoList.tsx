import React from 'react';
import styled from '@emotion/styled';
import ReservationUserInfoItem from './ReservationUserInfoItem';
import { ReservationUser } from '@/api/stadiumApi';

interface ReservationUserInfoListProps {
  id: string;
  list: ReservationUser[];
}

const ReservationUserInfoList = ({ id, list }: ReservationUserInfoListProps) => {
  return (
    <Container>
      {list.map(item => (
        <ReservationUserInfoItem key={item.reservationId} stadiumId={id} item={item} />
      ))}
    </Container>
  );
};

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export default ReservationUserInfoList;

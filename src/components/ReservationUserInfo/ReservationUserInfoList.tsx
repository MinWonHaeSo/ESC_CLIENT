import React from 'react';
import styled from '@emotion/styled';
import ReservationUserInfoItem from './ReservationUserInfoItem';
import { ReservationUserType } from '@/api/stadiumApi';

interface ReservationUserInfoListProps {
  id: string;
  list: ReservationUserType[];
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

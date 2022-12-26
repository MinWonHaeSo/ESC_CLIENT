import React from 'react';
import styled from '@emotion/styled';
import ReservationUserInfoItem from './ReservationUserInfoItem';

interface ReservationUserInfoListProps {
  list: any[];
}

const ReservationUserInfoList = ({ list }: ReservationUserInfoListProps) => {
  console.log(list);
  return (
    <Container>
      {list.map(item => (
        <ReservationUserInfoItem key={item.id} item={item} />
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

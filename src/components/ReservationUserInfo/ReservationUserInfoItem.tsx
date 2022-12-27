import React, { useContext } from 'react';
import styled from '@emotion/styled';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import { modalContext } from '@/context/ModalContext';
import ReservationUserInfoModal from './ReservationUserInfoModal';

interface ReservationUserInfoItemProps {
  item: any;
}

const ReservationUserInfoItem = ({ item }: ReservationUserInfoItemProps) => {
  const modal = useContext(modalContext)?.openModal;

  const handleOpenDetailModal = () => {
    modal?.(<ReservationUserInfoModal id={item.id} />);
  };
  return (
    <Conatiner aria-label="user reservation modal open" role="button" onClick={handleOpenDetailModal}>
      <UserInfoWrapper>
        <span>{item.userName} 님의 예약 정보</span>
      </UserInfoWrapper>
      <ReservationTimeWrapper>예약 날자 : {item.date}</ReservationTimeWrapper>
      <div>결제 금액 : 150,000 원</div>
    </Conatiner>
  );
};

const Conatiner = styled.li`
  padding: 12px 20px;
  border-radius: 10px;
  border: 1px solid ${palette.grey[100]};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const UserInfoWrapper = styled.p``;

const ReservationTimeWrapper = styled.p`
  color: ${palette.grey[400]};
  font-size: ${typo.small};
`;

export default ReservationUserInfoItem;

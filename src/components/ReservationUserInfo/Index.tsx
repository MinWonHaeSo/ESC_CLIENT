import React from 'react';
import styled from '@emotion/styled';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import Responsive from '../common/Responsive';
import Title from '../common/atoms/Title';
import ReservationUserInfoList from './ReservationUserInfoList';
import PrevButton from './PrevButton';
import { useGetStadiumManagerReservationUserListQuery } from '@/api/stadiumApi';
import EmptyItemNotification from '../common/EmptyItemNotification';
import Loading from '../common/Loading/Loading';

interface ReservationUserInfoProps {
  id: string;
}

const ReservationUserInfo = ({ id }: ReservationUserInfoProps) => {
  const { data, isLoading } = useGetStadiumManagerReservationUserListQuery(id);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <TitleBlock>
        <PrevButton />
        <Title fontSize={`${typo.xLarge}`}>예약 유저</Title>
        <TotalCountBlock>
          <span>{data?.totalElements} </span>명
        </TotalCountBlock>
      </TitleBlock>
      {data?.content.length === 0 ? (
        <EmptyItemNotification message="예약한 유저가 없습니다." btnActive={false} />
      ) : (
        <ReservationUserInfoList id={id} list={data?.content!} />
      )}
    </Container>
  );
};

const Container = styled.div`
  ${Responsive.ResponsiveWrapper}
  margin-top: 1rem;
`;

const TitleBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const TotalCountBlock = styled.div`
  flex-grow: 3;
  text-align: end;
  margin-right: 8px;
  font-weight: 600;
  span {
    font-size: ${typo.xLarge};
    color: ${palette.primary['green']};
  }
`;

export default ReservationUserInfo;

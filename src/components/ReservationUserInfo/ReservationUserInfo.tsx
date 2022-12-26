import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';
import React from 'react';
import Title from '../common/atoms/Title';
import Responsive from '../common/Responsive';
import ReservationUserInfoList from './ReservationUserInfoList';

const data = [
  {
    id: 1,
    userName: '장비',
    date: '2022-12-31',
  },
  {
    id: 2,
    userName: '유비',
    date: '2022-12-31',
  },
  {
    id: 3,
    userName: '조조',
    date: '2022-12-31',
  },
  {
    id: 4,
    userName: '관우',
    date: '2022-12-31',
  },
  {
    id: 5,
    userName: '손권',
    date: '2022-12-31',
  },
];

interface ReservationUserInfoProps {}

const ReservationUserInfo = (props: ReservationUserInfoProps) => {
  return (
    <Container>
      <TitleWrapper>
        <Title fontSize={`${typo.xLarge}`} marginTop="20px">
          예약 유저
        </Title>
        <TotalCountBlock>
          <span>0 </span>명
        </TotalCountBlock>
      </TitleWrapper>
      <ReservationUserInfoList list={data} />
    </Container>
  );
};

const Container = styled.div`
  ${Responsive.ResponsiveWrapper}
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 8px;
`;

const TotalCountBlock = styled.div`
  margin-right: 8px;
  font-weight: 600;
  span {
    font-size: ${typo.xLarge};
    color: ${palette.primary['green']};
  }
`;

export default ReservationUserInfo;

import React from 'react';
import styled from '@emotion/styled';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import Responsive from '../common/Responsive';
import Title from '../common/atoms/Title';
import ReservationUserInfoList from './ReservationUserInfoList';
import PrevButton from './PrevButton';

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
      <TitleBlock>
        <PrevButton />
        <Title fontSize={`${typo.xLarge}`}>예약 유저</Title>
        <TotalCountBlock>
          <span>0 </span>명
        </TotalCountBlock>
      </TitleBlock>
      <ReservationUserInfoList list={data} />
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

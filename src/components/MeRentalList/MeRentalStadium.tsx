import media from '@/lib/styles/media';
import styled from '@emotion/styled';
import { useLocation } from 'react-router';
import CardStadium from '../CardStadium/CardStadium';
import MeRentalInfo from './MeRentalInfo';

export interface StadiumData {
  name: string;
  status: '예약중' | '예약취소' | '사용완료';
  address: string;
  info: {
    tags: Array<string>;
    date: string;
    time: string;
    people: number;
    items: number;
  };
}

export const stadiumData: StadiumData[] = [
  {
    status: '예약중',
    name: '강남 체육관',
    address: '서울시 강남구 언주로 45길 123',
    info: {
      tags: ['축구', '축구장'],
      date: '2022-12-25',
      time: '13:30 - 14:30',
      people: 3,
      items: 7,
    },
  },
  {
    status: '예약취소',
    name: '서초 체육관',
    address: '서울시 서초구 서래마을 45길 123',
    info: {
      tags: ['축구', '축구장'],
      date: '2022-12-25',
      time: '13:30 - 14:30',
      people: 3,
      items: 8,
    },
  },
  {
    status: '사용완료',
    name: '성북 체육관',
    address: '서울시 성북구 고려대로 45길 123',
    info: {
      tags: ['축구', '축구장'],
      date: '2022-12-25',
      time: '13:30 - 14:30',
      people: 3,
      items: 9,
    },
  },
  {
    status: '예약중',
    name: '강남 체육관',
    address: '서울시 강남구 언주로 45길 123',
    info: {
      tags: ['축구', '축구장'],
      date: '2022-12-25',
      time: '13:30 - 14:30',
      people: 3,
      items: 6,
    },
  },
  {
    status: '예약취소',
    name: '서초 체육관',
    address: '서울시 서초구 서래마을 45길 123',
    info: {
      tags: ['축구', '축구장'],
      date: '2022-12-25',
      time: '13:30 - 14:30',
      people: 3,
      items: 5,
    },
  },
  {
    status: '사용완료',
    name: '성북 체육관',
    address: '서울시 성북구 고려대로 45길 123',
    info: {
      tags: ['축구', '축구장'],
      date: '2022-12-25',
      time: '13:30 - 14:30',
      people: 3,
      items: 4,
    },
  },
];

const MeRentalStadium = () => {
  const location = useLocation();
  return (
    <>
      {stadiumData.map(stadium => {
        return (
          <MeRentalStadiumBlock key={stadium.info.items}>
            <CardStadium stadium={stadium} currentLocation={location.pathname} />
            <MeRentalInfo stadiumInfo={stadium.info} />
          </MeRentalStadiumBlock>
        );
      })}
    </>
  );
};

export default MeRentalStadium;

const MeRentalStadiumBlock = styled.div`
  display: flex;
  margin-bottom: 1rem;
  padding: 10px;
  gap: 0.8rem;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  ${media.mediumMin} {
    gap: 1rem;
    padding: 8px;
  }

  ${media.xxlargeMin} {
    gap: 1.5rem;
    padding: 16px;
  }
`;

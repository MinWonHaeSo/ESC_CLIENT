import React from 'react';
import Map from '../KakaoMap/Map';
import MarkerStadiumInfo from '../KakaoMap/MarkerStadiumInfo';

interface HomeProps {}

const markerData = [
  {
    title: '수원 경기장',
    lat: 37.62197524055062,
    lng: 127.16017523675508,
    price: '10,000',
    location: '경기도 성남시 분당구 OOO OOO',
    revies: '4.5',
  },
  {
    title: '월드컵 경기장',
    lat: 37.620842424005616,
    lng: 127.1583774403176,
    location: '경기도 OOO OOO OOO OOO',
    revies: '4.7',
  },
  {
    title: '레포츠 공원',
    lat: 37.624915253753194,
    lng: 127.15122688059974,
    location: '서울특별시 OOO OOO OOO OOO',
    revies: '3.7',
  },
  {
    title: '체육관',
    lat: 37.62456273069659,
    lng: 127.15211256646381,
    location: '서울특별시 OOO OOO OOO OOO',
    revies: '3.5',
  },
];

const Home = (props: HomeProps) => {
  return (
    <div>
      <Map markerData={markerData} />
      <MarkerStadiumInfo />
    </div>
  );
};

export default Home;

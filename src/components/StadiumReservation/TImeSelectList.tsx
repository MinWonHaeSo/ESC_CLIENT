import React from 'react';
import styled from '@emotion/styled';
import Dividers from '../common/Dividers';
import TimeSelectItem from './TimeSelectItem';
import excludeTimes from '@/lib/utils/excludeTimes';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface TimeSelectListProps {
  openTime: string;
  closeTime: string;
}

const TimeSelectList = ({ openTime, closeTime }: TimeSelectListProps) => {
  const reservedTimes = useSelector((state: RootState) => state.stadiumReservation.data.reservedTimes);
  const amTime = excludeTimes({ excludeTime: openTime, type: 'am' });
  const pmTime = excludeTimes({ excludeTime: closeTime, type: 'pm' });

  return (
    <div>
      <span>오전</span>
      <TimeSelectItem times={amTime} reservedTimes={reservedTimes} />
      <Dividers />
      <span>오후</span>
      <TimeSelectItem times={pmTime} reservedTimes={reservedTimes} />
      <div></div>
    </div>
  );
};

const TomeSelectButtonContainer = styled.div``;

export default TimeSelectList;
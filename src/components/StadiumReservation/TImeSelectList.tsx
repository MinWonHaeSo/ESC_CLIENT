import React from 'react';
import styled from '@emotion/styled';
import Dividers from '../common/Dividers';
import TimeSelectItem from './TimeSelectItem';
import excludeTimes from '@/lib/utils/excludeTimes';

interface TImeSelectListProps {}

const openDate = '9:00';
const closeDate = '20:30';

const disabledDate = ['12:00', '11:00', '13:00', '20:00'];

const TImeSelectList = (props: TImeSelectListProps) => {
  const amTime = excludeTimes({ excludeTime: openDate, type: 'am' });
  const pmTime = excludeTimes({ excludeTime: closeDate, type: 'pm' });

  return (
    <div>
      <span>오전</span>
      <TimeSelectItem times={amTime} reservedTimes={disabledDate} />
      <Dividers />
      <span>오후</span>
      <TimeSelectItem times={pmTime} reservedTimes={disabledDate} />
      <div></div>
    </div>
  );
};

const TomeSelectButtonContainer = styled.div``;

export default TImeSelectList;

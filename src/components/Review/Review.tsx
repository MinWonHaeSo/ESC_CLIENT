import React from 'react';
import styled from '@emotion/styled';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import ReviewHeader from './ReviewHeader';
import ReviewSubmit from './ReviewSubmit';
import ReviewList from './ReviewList';

type Props = {};

const Review = (props: Props) => {
  return (
    <ReviewContainer>
      <ReviewHeader />
      <ReviewSubmit />
      <ReviewList />
    </ReviewContainer>
  );
};

const ReviewContainer = styled.div`
  display: flex;
  margin: 1rem 0;
  flex-direction: column;
`;

export default Review;

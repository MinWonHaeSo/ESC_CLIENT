import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';
import React from 'react';
import ReviewListItem from './ReviewListItem';

interface ReviewListProps {}

const ReviewList = (props: ReviewListProps) => {
  return (
    <ReviewListContainer>
      {Array.from({ length: 5 }).map(review => (
        <ReviewListItem />
      ))}
    </ReviewListContainer>
  );
};

const ReviewListContainer = styled.ul`
  margin-top: 1rem;
`;

export default ReviewList;

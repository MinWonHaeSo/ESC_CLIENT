import React from 'react';
import styled from '@emotion/styled';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import ReviewHeader from './ReviewHeader';
import ReviewSubmit from './ReviewSubmit';
import ReviewList from './ReviewList';
import { useGetReviewListQuery } from '@/api/reviewApi';
import Loading from '../common/Loading/Loading';

interface ReviewProps {
  stadiumId: string;
}

const Review = ({ stadiumId }: ReviewProps) => {
  const { data, isLoading, error } = useGetReviewListQuery({ id: stadiumId });

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <ReviewContainer>
      <ReviewHeader />
      <ReviewSubmit id={stadiumId} />
      <ReviewList contents={data.content} />
    </ReviewContainer>
  );
};

const ReviewContainer = styled.div`
  display: flex;
  margin: 1rem 0;
  flex-direction: column;
`;

export default Review;

import { ContentType } from '@/api/reviewApi';
import palette from '@/lib/styles/palette';
import { RootState } from '@/store/store';
import styled from '@emotion/styled';
import React from 'react';
import { useSelector } from 'react-redux';
import EmptyItemNotification from '../common/EmptyItemNotification';
import ReviewListItem from './ReviewListItem';

interface ReviewListProps {}

const ReviewList = ({}: ReviewListProps) => {
  const reviewList = useSelector((state: RootState) => state.stadiumReview.list);

  return (
    <ReviewListContainer>
      {reviewList.length ? (
        reviewList.map((review, idx) => <ReviewListItem key={idx} content={review} />)
      ) : (
        <EmptyItemNotification message={'작성된 리뷰가 없습니다.'} btnActive={false} />
      )}
    </ReviewListContainer>
  );
};

const ReviewListContainer = styled.ul`
  margin-top: 1rem;
`;

const EmptyReviewContainer = styled.div``;

export default ReviewList;

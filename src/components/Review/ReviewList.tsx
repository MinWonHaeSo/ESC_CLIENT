import React from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import EmptyItemNotification from '../common/EmptyItemNotification';
import ReviewListItem from './ReviewListItem';

interface ReviewListProps {
  stadiumId: string;
}

const ReviewList = ({ stadiumId }: ReviewListProps) => {
  const reviewList = useSelector((state: RootState) => state.stadiumReview.list);

  return (
    <ReviewListContainer>
      {reviewList.length ? (
        reviewList.map(review => <ReviewListItem key={review.id} stadiumId={stadiumId} content={review} />)
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

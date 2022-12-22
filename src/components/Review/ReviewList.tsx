import { ContentType } from '@/api/reviewApi';
import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';
import React from 'react';
import EmptyItemNotification from '../common/EmptyItemNotification';
import ReviewListItem from './ReviewListItem';

interface ReviewListProps {
  contents: ContentType[];
}

const ReviewList = ({ contents }: ReviewListProps) => {
  return (
    <ReviewListContainer>
      {contents.length ? (
        contents.map((review, idx) => <ReviewListItem key={idx} content={review} />)
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

import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import { reviewApi } from '@/api/reviewApi';
import { clearReview } from '@/store/stadiumReview';
import { RootState } from '@/store/store';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import ReviewHeader from './ReviewHeader';
import ReviewSubmit from './ReviewSubmit';
import ReviewList from './ReviewList';

interface ReviewProps {
  stadiumId: string;
}

const Review = ({ stadiumId }: ReviewProps) => {
  const [trigger] = reviewApi.endpoints.getReviewList.useLazyQuery();
  const { isLast, nextPage } = useSelector((state: RootState) => ({
    isLast: state.stadiumReview.isLast,
    nextPage: state.stadiumReview.nextPage,
  }));

  const dispatch = useDispatch();
  const fetchNextPage = () => {
    if (isLast) return;
    const page = nextPage ? nextPage : 0;

    trigger({ id: stadiumId, page: page });
  };

  const $observerTarget = useInfinityScroll(fetchNextPage);

  useEffect(() => {
    return () => {
      dispatch(clearReview());
    };
  }, [dispatch]);

  return (
    <ReviewContainer>
      <ReviewHeader />
      <ReviewSubmit id={stadiumId} />
      <ReviewList />
      <div ref={$observerTarget}></div>
    </ReviewContainer>
  );
};

const ReviewContainer = styled.div`
  display: flex;
  margin: 1rem 0;
  flex-direction: column;
`;

export default Review;

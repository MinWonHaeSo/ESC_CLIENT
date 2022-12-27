import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import { addComment, clearReview } from '@/store/stadiumReview';
import { RootState } from '@/store/store';
import { useAddReviewMutation } from '@/api/reviewApi';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';

interface ReviewSubmitProps {
  stadiumId: string;
}

const ReviewSubmit = ({ stadiumId }: ReviewSubmitProps) => {
  const review = useSelector((state: RootState) => state.stadiumReview);
  const [addReviewAPI] = useAddReviewMutation();
  const dispatch = useDispatch();

  const handleSumbitReview = async () => {
    const response = await addReviewAPI({ id: stadiumId, comment: review.comment, star: review.star });
    dispatch(clearReview());
  };

  const handleChangeReviewComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(addComment(e.target.value));
  };

  return (
    <ReviewSubmitContainer>
      <textarea
        value={review.comment}
        onChange={handleChangeReviewComment}
        placeholder="리뷰를 작성하세요. (100자 이내)"
      />
      <button type="button" onClick={handleSumbitReview}>
        등록하기
      </button>
    </ReviewSubmitContainer>
  );
};

const ReviewSubmitContainer = styled.div`
  textarea {
    width: 100%;
    padding: 0.8rem 1rem;
    border-radius: 10px;
    border: 1px solid ${palette.grey[300]};
    font-size: ${typo.base};
  }

  button {
    display: block;
    width: 100px;
    margin-left: auto;
    padding: 0.5rem 0;
    border-radius: 10px;
    background-color: ${palette.primary.green};
    color: #fff;
  }
`;

export default ReviewSubmit;

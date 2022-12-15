import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';
import React from 'react';

interface ReviewSubmitProps {}

const ReviewSubmit = (props: ReviewSubmitProps) => {
  return (
    <ReviewSubmitContainer>
      <textarea placeholder="리뷰를 작성하세요. (100자 이내)" />
      <button type="button">등록하기</button>
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

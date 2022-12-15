import React from 'react';
import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';

interface ReviewHeaderProps {}

const ReviewHeader = (props: ReviewHeaderProps) => {
  return (
    <ReviewHeaderContainer>
      <span className="title">리뷰</span>
      <div>별점 매기기</div>
    </ReviewHeaderContainer>
  );
};

const ReviewHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  .title {
    width: 6rem;
    height: 100%;
    padding: 6px 8px;
    border: 1px solid ${palette.grey[300]};
    border-radius: 10px;
    background-color: #fff;
    text-align: center;
  }

  div {
    display: flex;
    align-items: flex-end;
  }
`;

export default ReviewHeader;

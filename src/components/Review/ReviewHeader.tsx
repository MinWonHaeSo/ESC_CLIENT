import React, { useEffect, useRef, useState } from 'react';
import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';
import ReviewDropdown from './ReviewDropdown';

interface ReviewHeaderProps {}

const ReviewHeader = (props: ReviewHeaderProps) => {
  return (
    <ReviewHeaderContainer>
      <span className="title">리뷰</span>
      <ReviewDropdown />
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
`;

export default ReviewHeader;

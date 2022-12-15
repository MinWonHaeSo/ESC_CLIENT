import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';
import React from 'react';

interface ReviewListItemProps {}

const ReviewListItem = (props: ReviewListItemProps) => {
  return (
    <ReviewListItemContainer>
      <div>
        <img src="http://via.placeholder.com/50x50" alt="유저프로필" width="50px" height="50px" />
      </div>
      <div className="user-review-info-container">
        <div className="user-info">
          <span className="user-name">유저명</span>
          <span className="review-date">2022-12-15</span>
        </div>
        <div className="review-content">
          여기 체육관 진짜 좋은데여기 체육관 진짜 좋은데여기 체육관 진짜 좋은데여기 체육관 진짜 좋은데여기 체육관 진짜
          좋은데 여기 체육관 진짜 좋은데 여기 체육관 진짜 좋은데
        </div>
      </div>
    </ReviewListItemContainer>
  );
};

const ReviewListItemContainer = styled.li`
  display: flex;
  padding: 1rem;
  gap: 1rem;

  & + & {
    border-top: 1px solid ${palette.grey[300]};
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid ${palette.grey[400]};
  }

  .user-review-info-container {
    font-size: 12px;
    color: ${palette.grey[500]};

    .user-info {
      display: flex;
      justify-content: space-between;
    }

    .user-name {
      font-size: 14px;
      font-weight: bold;
    }
  }
`;

export default ReviewListItem;

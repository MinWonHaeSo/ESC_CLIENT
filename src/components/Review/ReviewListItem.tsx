import { ContentType } from '@/api/reviewApi';
import palette from '@/lib/styles/palette';
import { RootState } from '@/store/store';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import StarRate from '../common/StarRate';

interface ReviewListItemProps {
  content: ContentType;
}

const ReviewListItem = ({ content }: ReviewListItemProps) => {
  const [reviewOption, setReviewOption] = useState(false);
  const user = useSelector((state: RootState) => state.user);

  return (
    <ReviewListItemContainer>
      <div>
        <img src="http://via.placeholder.com/50x50" alt="유저프로필" width="50px" height="50px" />
      </div>
      <div className="user-review-info-container">
        <div className="user-info">
          <span className="user-name">{content.nickname}</span>
          <span>
            <StarRate starRating={content.star} />
          </span>
          <span className="review-date">{content.createdAt}</span>
        </div>
        <div className="review-content">{content.comment}</div>
        <div className="review-btn-container">
          <button className="review-submit-btn">등록</button>
          <button className="review-edit-btn">수정</button>
          <button className="review-remove-btn">삭제</button>
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
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 0.5rem;
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

    .review-content {
      min-height: 60px;
      padding: 0.5rem 0.5rem;
      border-radius: 10px;
      border: 1px solid ${palette.grey[300]};
    }
  }

  .review-btn-container {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;

    button {
      border-radius: 10px;
      padding: 0.2rem 1rem;
      font-size: 12px;
      color: #fff;
    }

    .review-submit-btn {
      background-color: ${palette.primary.blue};
    }
    .review-edit-btn {
      background-color: ${palette.primary.green};
    }
    .review-remove-btn {
      background-color: ${palette.primary.red};
    }
  }
`;

export default ReviewListItem;

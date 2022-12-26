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
  const [isEditBtn, setIsEditBtn] = useState(false);
  const [editComment, setEditComment] = useState(content.comment);
  const auth = useSelector((state: RootState) => state.auth);

  const handleSubmitEditComment = () => {
    // submit POST API

    setIsEditBtn(false);
  };

  console.log(content);

  console.log(auth);

  return (
    <ReviewListItemContainer>
      <div className="user-name-container">
        <img src={content.member.imgUrl} alt="유저프로필" width="50px" height="50px" />
        <div>
          <span className="user-name">{content.member.nickname}</span>
        </div>
      </div>
      <div className="user-review-info-container">
        <div className="user-info">
          <span>
            <StarRate starRating={content.star} />
          </span>
          <span className="review-date">{content.createdAt}</span>
        </div>
        {isEditBtn ? (
          <input
            type="text"
            className="review-content"
            value={editComment}
            onChange={e => setEditComment(e.target.value)}
          />
        ) : (
          <div className="review-content">{content.comment}</div>
        )}
        {String(auth.id) == content.member.id ? (
          <div className="review-btn-container">
            {isEditBtn ? (
              <button className="review-submit-btn" onClick={handleSubmitEditComment}>
                등록
              </button>
            ) : (
              <button className="review-edit-btn" onClick={() => setIsEditBtn(true)}>
                수정
              </button>
            )}
            <button className="review-remove-btn">삭제</button>
          </div>
        ) : null}
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

  .user-name-container {
    width: 100px;
    flex: 1;
  }

  .user-name {
    font-size: 12px;
    font-weight: bold;
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

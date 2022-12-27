import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { ContentType, useRemoveReviewMutation, useUpdateReviewMutation } from '@/api/reviewApi';
import { RootState } from '@/store/store';
import palette from '@/lib/styles/palette';
import StarRate from '../common/StarRate';
import Loading from '../common/Loading/Loading';
import { removeReview, updateComment } from '@/store/stadiumReview';

interface ReviewListItemProps {
  content: ContentType;
  stadiumId: string;
}

const ReviewListItem = ({ content, stadiumId }: ReviewListItemProps) => {
  const [isEditBtn, setIsEditBtn] = useState(false);
  const [editComment, setEditComment] = useState(content.comment);
  const auth = useSelector((state: RootState) => state.auth);
  const [updateReviewAPI, { isLoading: fetchLoading }] = useUpdateReviewMutation();
  const [removeReviewAPI, { isLoading: deleteLoading }] = useRemoveReviewMutation();
  const dispatch = useDispatch();

  const handleSubmitEditComment = async (reviewId: string) => {
    // submit POST API
    const response = await updateReviewAPI({ stadiumId, reviewId, comment: editComment, star: content.star });
    dispatch(updateComment({ id: reviewId, comment: editComment }));
    setIsEditBtn(false);
  };

  const handleRemoveComment = async (reviewId: string) => {
    // submit DELETE API
    const reponse = await removeReviewAPI({ stadiumId, reviewId });
    dispatch(removeReview({ id: reviewId }));
  };

  return (
    <ReviewListItemContainer>
      {fetchLoading || deleteLoading ? <Loading /> : null}
      <div className="user-name-container">
        <img
          src={content.member.imgUrl ? content.member.imgUrl : 'https://via.placeholder.com/50x50'}
          alt="유저프로필"
          width="50px"
          height="50px"
        />
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
              <button className="review-submit-btn" onClick={() => handleSubmitEditComment(content.id)}>
                등록
              </button>
            ) : (
              <button className="review-edit-btn" onClick={() => setIsEditBtn(true)}>
                수정
              </button>
            )}
            <button className="review-remove-btn" onClick={() => handleRemoveComment(content.id)}>
              삭제
            </button>
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

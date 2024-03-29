import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { usePostLikeStadiumMutation } from '@/api/stadiumApi';
import { stadiumWriteState, updateStadium } from '@/store/stadiumWriteSlice';
import { RootState } from '@/store/store';
import useDebounce from '@/hooks/useDebounce';
import { typo } from '@/lib/styles/typo';
import palette from '@/lib/styles/palette';
import PATH from '@/constants/path';

interface UserActionButtonProps {
  post: stadiumWriteState;
  stadiumId: string;
  stadiumLike: boolean;
  refetch: () => void;
}

const UserActionButton = ({ post, stadiumId, stadiumLike, refetch }: UserActionButtonProps) => {
  const [like, setLike] = useState(stadiumLike);
  const userId = useSelector((state: RootState) => state.auth.id);
  const [postLikeStadiumAPI] = usePostLikeStadiumMutation();
  const likeCallbackAPI = useDebounce(() => postLikeStadiumAPI(stadiumId));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeStadiumLike = () => {
    likeCallbackAPI();
    setLike(!like);
    refetch();
  };

  const handleGotoEdit = useCallback(() => {
    if (post) {
      dispatch(updateStadium(post));
      navigate(`${PATH.MANAGER_STADIUM_UPLOAD}`);
    }
  }, [dispatch, post]);

  const handleGotoRental = () => {
    navigate(`${PATH.STADIUM_RENTAL}`, {
      state: {
        id: stadiumId,
      },
    });
  };

  return (
    <ButtonActionContainer>
      {userId == String(post.memberId) ? (
        <button className="btn btn-action" onClick={handleGotoEdit}>
          수정하기
        </button>
      ) : (
        <>
          <button className="book-mark" onClick={handleChangeStadiumLike}>
            <i className={like ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'}></i>
          </button>
          <button className="btn btn-action" onClick={handleGotoRental}>
            예약하기
          </button>
        </>
      )}
    </ButtonActionContainer>
  );
};

const ButtonActionContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
  gap: 1rem;

  .book-mark {
    right: 0.4rem;
    font-size: ${typo.xLarge};
  }

  .btn {
    width: 100%;
    padding: 12px 16px;
    border-radius: 10px;
    background-color: #000;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    cursor: pointer;
  }

  i {
    font-size: ${typo.xLarge};
    color: ${palette.primary['orange']};
  }
`;
export default UserActionButton;

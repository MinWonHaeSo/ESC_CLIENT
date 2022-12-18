import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import styled from '@emotion/styled';
import Tag from '../Tag/Tag';
import Slider from '../Slide/Slider';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import Info from './Info';
import { useGetStadiumDetailQuery, usePostLikeStadiumMutation } from '@/api/stadiumApi';
import Loading from '../common/Loading/Loading';
import sw from '@/lib/utils/customSweetAlert';
import { useNavigate } from 'react-router-dom';
import PATH from '@/constants/path';
import Title from '../common/atoms/Title';
import useThrottleRef from '@/hooks/useThrottleRef';
import { useDispatch } from 'react-redux';
import { updateStadium } from '@/store/stadiumWriteSlice';

interface DetailProps {
  stadiumId: string;
}

const Detail = ({ stadiumId }: DetailProps) => {
  const [stadiumLike, setStadiumLike] = useState(false);
  const { data, isLoading, error } = useGetStadiumDetailQuery(stadiumId);
  const [postLikeStadiumAPI] = usePostLikeStadiumMutation();
  const likeCallbackAPI = useThrottleRef(() => postLikeStadiumAPI(stadiumId));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeStadiumLike = () => {
    // 찜하기 logic 작성
    setStadiumLike(!stadiumLike);
    postLikeStadiumAPI(stadiumId);
    likeCallbackAPI();
  };

  const handleGotoEdit = useCallback(() => {
    if (data) {
      dispatch(updateStadium(data));
      navigate(`${PATH.MANAGER_STADIUM_UPLOAD}`);
    }
  }, [dispatch, data]);

  const handleGotoRental = () => {
    navigate(`${PATH.ROOT}`);
  };

  useEffect(() => {
    if (error) {
      sw.toast.error('잘못된 요청입니다.');
      navigate(PATH.ROOT);
    }
  }, [error]);

  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <div>
      <Title fontSize={`${typo.xLarge}`}>{data.name}</Title>
      <SliderWrapper>
        <Slider images={data.imgs} />
      </SliderWrapper>
      <Tag tags={data.tags} />
      <Info info={data} />
      <ButtonActionContainer>
        <button className="book-mark" onClick={handleChangeStadiumLike}>
          <i className={stadiumLike ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'}></i>
        </button>
        {/* <button className="btn btn-action" onClick={handleGotoRental}>예약하기</button> */}
        <button className="btn btn-action" onClick={handleGotoEdit}>
          수정하기
        </button>
      </ButtonActionContainer>
    </div>
  );
};

const ButtonActionContainer = styled.div`
  display: flex;
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
    color: ${palette.primary['orange']};
  }
`;

const SliderWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
  justify-content: center;
`;

export default Detail;

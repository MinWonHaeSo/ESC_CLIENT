import React, { useEffect, useLayoutEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useGetStadiumDetailQuery, usePostLikeStadiumMutation } from '@/api/stadiumApi';
import sw from '@/lib/utils/customSweetAlert';
import PATH from '@/constants/path';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import Title from '../common/atoms/Title';
import Slider from '../Slide/Slider';
import Loading from '../common/Loading/Loading';
import Tag from '../Tag/Tag';
import Info from './Info';
import UserActionButton from './UserActionButton';

interface DetailProps {
  stadiumId: string;
}

const Detail = ({ stadiumId }: DetailProps) => {
  const { data, isLoading, error } = useGetStadiumDetailQuery(stadiumId);
  const navigate = useNavigate();

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
      <UserActionButton post={data} stadiumId={stadiumId} />
    </div>
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

const SliderWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
  justify-content: center;
`;

export default Detail;

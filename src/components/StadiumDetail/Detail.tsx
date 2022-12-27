import React, { useEffect, useLayoutEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useGetStadiumDetailQuery } from '@/api/stadiumApi';
import sw from '@/lib/utils/customSweetAlert';
import { typo } from '@/lib/styles/typo';
import PATH from '@/constants/path';
import Loading from '../common/Loading/Loading';
import Title from '../common/atoms/Title';
import Slide from '../Slide/Index';
import Tag from '../Tag/Index';
import UserActionButton from './UserActionButton';
import Info from './Info';

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
        <Slide images={data.imgs} />
      </SliderWrapper>
      <Tag tags={data.tags} />
      <Info info={data} />
      <UserActionButton post={data} stadiumId={stadiumId} />
    </div>
  );
};

const SliderWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
  justify-content: center;
`;

export default Detail;

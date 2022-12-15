import React, { useState } from 'react';
import styled from '@emotion/styled';
import { stadiumDetailState } from '@/store/stadiumDetailSlice';
import Tag from '../Tag/Tag';
import Slider from '../Slide/Slider';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import Info from './Info';

interface DetailProps {
  detail: stadiumDetailState;
}

const tagData = ['축구', '풋살'];

const Detail = ({ detail }: DetailProps) => {
  const [stadiumLike, setStadiumLike] = useState(false);

  const handleChangeStadiumLike = () => {
    // 찜하기 logic 작성

    setStadiumLike(!stadiumLike);
  };

  return (
    <div>
      <h1>체육관 이름</h1>
      <SliderWrapper>
        <Slider />
      </SliderWrapper>
      <Tag tags={tagData} />
      <Info />
      <ButtonActionContainer>
        <button className="book-mark" onClick={handleChangeStadiumLike}>
          <i className={stadiumLike ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'}></i>
        </button>
        <button className="btn btn-action">예약하기</button>
        {/* <button className="btn btn-action">수정하기</button> */}
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
  justify-content: center;
`;

export default Detail;

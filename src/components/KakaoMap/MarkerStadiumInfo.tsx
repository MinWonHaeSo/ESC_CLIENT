import React, { useState } from 'react';
import styled from '@emotion/styled';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import { useNavigate } from 'react-router-dom';
import PATH from '@/constants/path';

interface MarkerStadiumInfoProps {}

const MarkerStadiumInfo = (props: MarkerStadiumInfoProps) => {
  const [stardiumLike, setStardiumLike] = useState(false);
  const navigate = useNavigate();

  const handleChangeStardiumLike = () => {
    // 찜하기 logic 작성

    setStardiumLike(!stardiumLike);
  };

  const toUploadNavigate = () => {
    navigate(`${PATH.STARDIUM_DETAIL}/1`);
  };

  return (
    <MarkerInfoContainer>
      <div className="book-mark" onClick={handleChangeStardiumLike}>
        <i className={stardiumLike ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'}></i>
      </div>
      <StardiumInfoContainer onClick={toUploadNavigate}>
        <div className="image-container">
          <img src="https://via.placeholder.com/100x110" alt="체육관 이미지" width="100px" height="110px" />
        </div>
        <div className="stardium-info">
          <h3 className="title">체육관 이름</h3>
          <p className="adress">경기도 성남시 분당구 판교역로 166</p>
          <div className="price-review-wrapper">
            <p>
              가격 : <span className="price">100,000 원</span>
            </p>
            <p>
              <i className="fa-solid fa-heart"></i> <span>4.8</span>
            </p>
          </div>
        </div>
      </StardiumInfoContainer>
    </MarkerInfoContainer>
  );
};

const MarkerInfoContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 80vw;
  height: 10rem;
  padding: 1.5rem 0.8rem;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 10px;
  border: 1px solid ${palette.grey[300]};
  z-index: 1;
  transform: translate(-50%, -10%);
  box-shadow: 5px 1px 19px rgba(77, 78, 79, 0.3);

  .book-mark {
    position: absolute;
    top: 0;
    right: 0.4rem;
    font-size: ${typo.large};
  }

  i {
    color: ${palette.primary['orange']};
  }
`;

const StardiumInfoContainer = styled.div`
  display: flex;
  gap: 1rem;

  .stardium-info {
    height: 110px;
    p {
      margin-top: 0.7rem;
      font-size: ${typo.micro};
      color: ${palette.grey[400]};
    }
  }

  .price-review-wrapper {
    display: flex;
    gap: 1rem;
  }
`;
export default MarkerStadiumInfo;

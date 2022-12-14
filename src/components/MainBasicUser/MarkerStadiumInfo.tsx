import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { SearchStadiumContentType } from '@/api/stadiumApi';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import PATH from '@/constants/path';

interface MarkerStadiumInfoProps {
  markerInfo: SearchStadiumContentType;
}

const MarkerStadiumInfo = ({ markerInfo }: MarkerStadiumInfoProps) => {
  const navigate = useNavigate();

  const toUploadNavigate = () => {
    navigate(`${PATH.STADIUM_DETAIL}/${markerInfo.stadiumId}`);
  };

  if (!Object.keys(markerInfo).length) {
    return null;
  }
  return (
    <MarkerInfoContainer>
      <StadiumInfoContainer onClick={toUploadNavigate}>
        <div className="image-container">
          <img
            src={markerInfo.imgUrl ? markerInfo.imgUrl : 'https://via.placeholder.com/100x110'}
            alt="체육관 이미지"
            width="100px"
            height="110px"
          />
        </div>
        <div className="stadium-info">
          <h4 className="title">{markerInfo.name}</h4>
          <p className="adress">{markerInfo.address}</p>
          <div className="price-review-wrapper">
            <p>
              가격 : <span className="price">{markerInfo.weekdayPricePerHalfHour} 원</span>
            </p>
            <p>
              <i className="fa-solid fa-heart"></i> <span>{markerInfo.star_avg}</span>
            </p>
          </div>
        </div>
      </StadiumInfoContainer>
    </MarkerInfoContainer>
  );
};

const MarkerInfoContainer = styled.div`
  position: absolute;
  bottom: 2%;
  left: 50%;
  width: 90vw;
  height: 10rem;
  padding: 1.5rem 0.8rem;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 10px;
  border: 1px solid ${palette.grey[300]};
  z-index: 1;
  transform: translate(-50%);
  box-shadow: 5px 1px 19px rgba(77, 78, 79, 0.3);
`;

const StadiumInfoContainer = styled.div`
  display: flex;
  gap: 1rem;

  .stadium-info {
    height: 110px;
    p {
      margin-top: 0.7rem;
      font-size: ${typo.micro};
      color: ${palette.grey[400]};
    }
    .title {
      width: 190px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .price-review-wrapper {
    display: flex;
    gap: 1rem;
  }
`;
export default MarkerStadiumInfo;

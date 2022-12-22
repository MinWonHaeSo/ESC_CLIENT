import { RentalStadium, ReservationStatus, usePostLikeStadiumMutation } from '@/api/stadiumApi';
import PATH from '@/constants/path';
import useThrottleRef from '@/hooks/useThrottleRef';
import media from '@/lib/styles/media';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusTag from './StatusTag';

interface CardStadiumProps {
  stadium: RentalStadium;
  currentLocation: string;
}

const CardStadium = ({ stadium, currentLocation }: CardStadiumProps) => {
  const [stadiumLike, setStadiumLike] = useState<boolean>(true);
  const { stadiumId, name, address, starAvg, imgUrl, status } = stadium;

  const navigate = useNavigate();

  const [postLikeStadiumAPI] = usePostLikeStadiumMutation();
  const likeCallbackAPI = useThrottleRef(() => postLikeStadiumAPI(String(stadiumId)));

  const handleChangeStadiumLike = () => {
    setStadiumLike(false);
    likeCallbackAPI();
  };

  const handleCardClick = () => {
    navigate(`${PATH.STADIUM_DETAIL}/${stadiumId}`);
  };

  return (
    <CardStadiumBlock>
      <StadiumImageWrapper>
        <img src={imgUrl} alt="체육관이미지" onClick={handleCardClick} />
        {currentLocation !== `${PATH.ME_RENTAL_LIST}` ? null : <StatusTag status={status!} />}
        {currentLocation === `${PATH.ME_LIKE_STADIUM_LIST}` ? (
          <Bookmark onClick={handleChangeStadiumLike}>
            <i className={stadiumLike ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'} />
          </Bookmark>
        ) : null}
      </StadiumImageWrapper>
      <StadiumDesc onClick={handleCardClick}>
        <StadiumName>{name}</StadiumName>
        <StadiumRate>
          <i className="fa-solid fa-heart" />
          <span>{starAvg}</span>
        </StadiumRate>
        <StadiumAddress>{address}</StadiumAddress>
      </StadiumDesc>
    </CardStadiumBlock>
  );
};

export default CardStadium;

const CardStadiumBlock = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: calc((100vw - 2.75rem) / 2);

  ${media.xsmallMin} {
    min-width: 156px;
  }

  ${media.medium} {
    max-width: 350px;
    min-height: 240px;
  }

  ${media.xlargeMin} {
    gap: 1rem;
    max-width: 600px;
  }
`;

const Bookmark = styled.button`
  position: absolute;
  top: 2px;
  right: 8px;
  font-size: ${typo.medium};
  background-color: transparent;
  i {
    color: ${palette.primary['orange']};
  }
`;

const StadiumImageWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 10px;

  img {
    display: inline-block;
    width: 100%;
    border-radius: 10px;
    object-fit: cover;

    ${media.xsmallMin} {
      height: 156px;
    }
    ${media.mediumMin} {
      width: calc(100% / 2);
      height: 320px;
    }
  }
`;

const StadiumDesc = styled.div`
  display: grid;
  grid-template-rows: 1fr 0.5fr 1fr;
  gap: 6px;
`;

const StadiumName = styled.div`
  padding-top: 2px;
  font-size: ${typo.small};
  font-weight: 600;

  ${media.xlargeMin} {
    font-size: ${typo.large};
  }
`;

const StadiumRate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 54px;
  border: 1px solid ${palette.grey[200]};
  border-radius: 10px;
  background-color: ${palette.grey[100]};
  i {
    margin-right: 4px;
    font-size: ${typo.small};
    color: ${palette.primary.point};

    ${media.xxlargeMin} {
      margin-right: 8px;
    }
  }
  span {
    font-size: ${typo.small};

    ${media.xxlargeMin} {
      font-size: ${typo.base};
    }
  }
`;

const StadiumAddress = styled.div`
  font-size: ${typo.micro};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  ${media.xlargeMin} {
    margin-top: 4px;
    font-size: ${typo.small};
  }
`;

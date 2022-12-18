import PATH from '@/constants/path';
import media from '@/lib/styles/media';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';
import { useState } from 'react';

interface CardStadiumProps {
  stadium: {
    name: string;
    status: '예약중' | '예약취소' | '사용완료';
    address: string;
    info: {
      tags: Array<string>;
      date: string;
      time: string;
      people: number;
      items: number;
    };
  };
  currentLocation?: string;
}

const CardStadium = ({ stadium, currentLocation }: CardStadiumProps) => {
  const { name, status, address } = stadium;

  const [stardiumLike, setStardiumLike] = useState(false);

  const handleChangeStardiumLike = () => {
    setStardiumLike(!stardiumLike);
  };

  return (
    <CardStadiumBlock>
      <StadiumImageWrapper>
        <img src="../../src/assets/gym.jpg" alt="체육관이미지" />
        {currentLocation !== `${PATH.ME_RENTAL_LIST}` ? null : <StatusTag status={status}>{status}</StatusTag>}
        {currentLocation === `${PATH.ME_LIKE_STADIUM_LIST}` ? (
          <Bookmark>
            <i className="fa-solid fa-bookmark" onClick={handleChangeStardiumLike} />
          </Bookmark>
        ) : null}
      </StadiumImageWrapper>
      <StadiumDesc>
        <InfoWrapper>
          <StadiumName>{name}</StadiumName>
          <StadiumRate>
            <i className="fa-solid fa-heart" />
            <span>4.5</span>
          </StadiumRate>
        </InfoWrapper>
        <StadiumAddress>{address}</StadiumAddress>
      </StadiumDesc>
    </CardStadiumBlock>
  );
};

export default CardStadium;

const CardStadiumBlock = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 1fr 0.4fr;
  gap: 4px;
  width: calc((100vw - 2.75rem) / 2);

  ${media.xsmallMin} {
    min-width: 156px;
  }

  ${media.medium} {
    min-height: 240px;
  }

  ${media.xxlargeMin} {
    gap: 1rem;
    width: calc(100vw / 2);
    height: 420px;
  }
`;

const Bookmark = styled.button`
  font-size: ${typo.medium};
  position: absolute;
  top: 2px;
  right: 8px;
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
    ${media.xxlargeMin} {
      height: 320px;
    }
  }
`;

const StatusTag = styled.div<{ status: '예약중' | '예약취소' | '사용완료' | '' }>`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 30px;
  font-size: ${typo.micro};
  font-weight: 500;
  color: #fff;
  text-align: center;
  border-radius: 10px;
  background-color: ${({ status }) =>
    status === '예약중'
      ? `${palette.primary['green']}`
      : status === '사용완료'
      ? `${palette.primary['orange']}`
      : `${palette.primary['red']}`};

  ${media.xxlargeMin} {
    width: 80px;
    height: 36px;
    font-size: ${typo.base};
  }
`;

const StadiumDesc = styled.div`
  display: grid;
  grid-template-rows: 0.75fr 1fr;
  gap: 8px;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StadiumName = styled.div`
  font-size: ${typo.base};
  font-weight: 600;

  ${media.xlargeMin} {
    font-size: ${typo.large};
  }
`;

const StadiumRate = styled.div`
  i {
    margin-right: 4px;
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
  font-size: ${typo.small};
`;

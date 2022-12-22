import { RentalStadium, useGetRentalStadiumListQuery } from '@/api/stadiumApi';
import { DEFAULT_ICONURL } from '@/constants/defaultImage';
import media from '@/lib/styles/media';
import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';
import { useLocation } from 'react-router';
import CardStadium from '../CardStadium/CardStadium';
import Button from '../common/atoms/Button';
import EmptyItemNotification from '../common/EmptyItemNotification';
import Loading from '../common/Loading/Loading';

// mock Data
const stadiumData: RentalStadium[] = [
  {
    status: 'RESERVED',
    name: '강남 체육관',
    address: '서울시 강남구 언주로 45길 123',
    starAvg: 4.5,
    imgUrl: DEFAULT_ICONURL,
    reservationId: 1,
    stadiumId: 9,
  },
  {
    status: 'CANCELED',
    name: '강남 체육관',
    address: '서울시 강남구 언주로 45길 123',
    starAvg: 4.5,
    imgUrl: DEFAULT_ICONURL,
    reservationId: 1,
    stadiumId: 2,
  },
  {
    status: 'CANCELED',
    name: '강남 체육관',
    address: '서울시 강남구 언주로 45길 123',
    starAvg: 4.5,
    imgUrl: DEFAULT_ICONURL,
    reservationId: 1,
    stadiumId: 3,
  },
];

interface MeRentalStadiumProps {
  sort: 'up' | 'down';
}

const MeRentalStadium = ({ sort }: MeRentalStadiumProps) => {
  const location = useLocation();

  const handleShowDetailClick = () => {};

  const { data, isLoading } = useGetRentalStadiumListQuery('');
  const rentalStadiumData = data?.content;
  console.log(rentalStadiumData);

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <>
      {rentalStadiumData!.length > 0 && sort === 'up' ? (
        <MeRentalStadiumGrid>
          {rentalStadiumData!.map(stadium => {
            return (
              <MeRentalStadiumBlock key={stadium.stadiumId}>
                <CardStadium stadium={stadium} currentLocation={location.pathname} />
                <ButtonWrapper>
                  <Button
                    type={'button'}
                    size={'small'}
                    backgroundColor={`${palette.black[100]}`}
                    onClick={handleShowDetailClick}
                  >
                    상세보기
                  </Button>
                  {stadium.status === 'RESERVED' ? (
                    <Button
                      type={'button'}
                      size={'small'}
                      backgroundColor={`${palette.primary.red}`}
                      onClick={() => {}}
                    >
                      예약취소
                    </Button>
                  ) : null}
                </ButtonWrapper>
              </MeRentalStadiumBlock>
            );
          })}
        </MeRentalStadiumGrid>
      ) : sort === 'down' ? (
        <MeRentalStadiumGrid>
          {rentalStadiumData!
            .map(stadium => {
              return (
                <MeRentalStadiumBlock key={stadium.stadiumId}>
                  <CardStadium stadium={stadium} currentLocation={location.pathname} />
                  <ButtonWrapper>
                    <Button
                      type={'button'}
                      size={'small'}
                      backgroundColor={`${palette.black[100]}`}
                      onClick={handleShowDetailClick}
                    >
                      상세보기
                    </Button>
                    {stadium.status === 'RESERVED' ? (
                      <Button
                        type={'button'}
                        size={'small'}
                        backgroundColor={`${palette.primary.red}`}
                        onClick={() => {}}
                      >
                        예약취소
                      </Button>
                    ) : null}
                  </ButtonWrapper>
                </MeRentalStadiumBlock>
              );
            })
            .reverse()}
        </MeRentalStadiumGrid>
      ) : (
        <EmptyItemNotification message="예약한 체육관이 없습니다." />
      )}
    </>
  );
};

export default MeRentalStadium;

const MeRentalStadiumGrid = styled.div`
  display: grid;
  gap: 12px;

  ${media.xsmallMin} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${media.mediumMin} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 24px;
  }
`;

const MeRentalStadiumBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  padding: 10px;
  gap: 0.8rem;
  border-radius: 10px;
  /* box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px; */

  ${media.mediumMin} {
    gap: 1rem;
    padding: 8px;
  }

  ${media.xxlargeMin} {
    gap: 1.5rem;
    padding: 16px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  /* justify-content: space-between; */
  gap: 8px;
`;

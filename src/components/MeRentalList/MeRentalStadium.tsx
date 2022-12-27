import { useCancelReservationMutation } from '@/api/reservationApi';
import { stadiumApi } from '@/api/stadiumApi';
import { modalContext } from '@/context/ModalContext';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import media from '@/lib/styles/media';
import palette from '@/lib/styles/palette';
import { RootState, useAppDispatch } from '@/store/store';
import styled from '@emotion/styled';
import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import CardStadium from '../CardStadium/CardStadium';
import Button from '../common/atoms/Button';
import EmptyItemNotification from '../common/EmptyItemNotification';
import Loading from '../common/Loading/Loading';
import MeRentalStadiumDetailModal from './MeRentalStadiumDetailModal';
import { clearPaging } from '../../store/pagingSlice';

interface MeRentalStadiumProps {
  sort: 'up' | 'down';
}

const MeRentalStadium = ({ sort }: MeRentalStadiumProps) => {
  const location = useLocation();

  const openModal = useContext(modalContext)?.openModal;
  const closeModal = useContext(modalContext)?.closeModal;
  const dispatch = useAppDispatch();

  const [trigger, { isLoading }] = stadiumApi.endpoints.getRentalStadiumList.useLazyQuery();
  const { content, isLast, nextPage } = useSelector((state: RootState) => state.paging);

  const fetchNextPage = () => {
    if (isLast) return;
    const page = nextPage ? nextPage : 0;
    trigger(page.toString()).refetch();
  };

  const $observerTarget = useInfinityScroll(fetchNextPage);

  const [cancelReservationAPI, { isLoading: cancelLoading }] = useCancelReservationMutation();

  const handleShowDetailClick = async (reservationId: string, stadiumId: string) => {
    openModal?.(
      <MeRentalStadiumDetailModal reservationId={reservationId} stadiumId={stadiumId} closeModal={closeModal!} />,
    );
  };

  const handleCancelClick = async (reservationId: string, stadiumId: string) => {
    await cancelReservationAPI({ reservationId, stadiumId });
    // rentalStadiumListRefetch();
  };

  useEffect(() => {
    return () => {
      dispatch(clearPaging());
    };
  }, [dispatch]);

  if (isLoading || cancelLoading) {
    return <Loading />;
  }

  const rentalStadiumData = content;
  console.log(rentalStadiumData);

  return (
    <>
      {rentalStadiumData.length > 0 && sort === 'up' ? (
        <MeRentalStadiumGrid>
          {rentalStadiumData.map(stadium => {
            const { reservationId, stadiumId } = stadium;
            return (
              <MeRentalStadiumBlock key={stadium.reservationId}>
                <CardStadium stadium={stadium} currentLocation={location.pathname} />
                <ButtonWrapper>
                  <Button
                    type={'button'}
                    size={'small'}
                    backgroundColor={`${palette.black[100]}`}
                    onClick={() => handleShowDetailClick(reservationId!, stadiumId)}
                  >
                    상세보기
                  </Button>
                  {stadium.status === 'RESERVED' ? (
                    <Button
                      type={'button'}
                      size={'small'}
                      backgroundColor={`${palette.primary.red}`}
                      onClick={() => handleCancelClick(reservationId!, stadiumId)}
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
          {rentalStadiumData
            .map(stadium => {
              const { reservationId, stadiumId } = stadium;
              return (
                <MeRentalStadiumBlock key={stadium.reservationId}>
                  <CardStadium stadium={stadium} currentLocation={location.pathname} />
                  <ButtonWrapper>
                    <Button
                      type={'button'}
                      size={'small'}
                      backgroundColor={`${palette.black[100]}`}
                      onClick={() => handleShowDetailClick(reservationId!, stadiumId)}
                    >
                      상세보기
                    </Button>
                    {stadium.status === 'RESERVED' ? (
                      <Button
                        type={'button'}
                        size={'small'}
                        backgroundColor={`${palette.primary.red}`}
                        onClick={() => handleCancelClick(reservationId!, stadiumId)}
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
        <EmptyItemNotification message="예약한 체육관이 없습니다." btnActive={false} />
      )}
      <div ref={$observerTarget}></div>
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
  gap: 0.8rem;
  border-radius: 10px;

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
  gap: 8px;
`;

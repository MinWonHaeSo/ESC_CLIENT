import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { RentalStadium, stadiumApi, useGetRentalStadiumListQuery } from '@/api/stadiumApi';
import { useCancelReservationMutation } from '@/api/reservationApi';
import { RootState, useAppDispatch } from '@/store/store';
import { changeStatus, clearPaging } from '@/store/pagingSlice';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import media from '@/lib/styles/media';
import sw from '@/lib/utils/customSweetAlert';
import EmptyItemNotification from '../common/EmptyItemNotification';
import PagingSpinner from '../common/Loading/PagingSpinner';
import Loading from '../common/Loading/Loading';
import MeRentalStadiumItem from './MeRentalStadiumItem';

interface MeRentalStadiumProps {
  content: RentalStadium[];
}

const MeRentalStadium = ({ content }: MeRentalStadiumProps) => {
  const [cancelReservationAPI, { isLoading: cancelLoading }] = useCancelReservationMutation();
  const { isLoading, refetch } = useGetRentalStadiumListQuery();
  const [trigger, { isLoading: pagingLoading }] = stadiumApi.endpoints.getMoreRentalStadiumList.useLazyQuery();
  const { isLast, nextPage } = useSelector((state: RootState) => state.paging);
  const dispatch = useAppDispatch();
  const fetchNextPage = () => {
    if (isLast) return;
    const page = nextPage ? nextPage : 0;
    trigger(page);
  };

  const $observerTarget = useInfinityScroll(fetchNextPage);

  const handleCancelClick = async (reservationId: string, stadiumId: string) => {
    try {
      await cancelReservationAPI({ reservationId, stadiumId });
      dispatch(changeStatus({ id: reservationId, status: 'CANCELED' }));
    } catch {
      sw.toast.error('서버 오류입니다.');
    }
  };

  useEffect(() => {
    refetch();

    return () => {
      dispatch(clearPaging());
    };
  }, []);

  if (content.length === 0) {
    return <EmptyItemNotification message="예약한 체육관이 없습니다." btnActive={false} />;
  }

  return (
    <>
      <MeRentalStadiumGrid>
        {isLoading || cancelLoading ? <Loading /> : null}
        {content.map(stadium => (
          <MeRentalStadiumItem key={stadium.stadiumId} item={stadium} onCancelClick={handleCancelClick} />
        ))}
      </MeRentalStadiumGrid>
      {pagingLoading ? <PagingSpinner /> : null}
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

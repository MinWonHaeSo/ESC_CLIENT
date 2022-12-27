import { useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { stadiumApi, useGetLikeStadiumListQuery } from '@/api/stadiumApi';
import { RootState, useAppDispatch } from '@/store/store';
import { clearPaging } from '@/store/pagingSlice';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { typo } from '@/lib/styles/typo';
import media from '@/lib/styles/media';
import PATH from '@/constants/path';
import EmptyItemNotification from '../common/EmptyItemNotification';
import ScrollToTopButton from '../common/ScrollToTopButton';
import PagingSpinner from '../common/Loading/PagingSpinner';
import Responsive from '../common/Responsive';
import Loading from '../common/Loading/Loading';
import Title from '../common/atoms/Title';
import CardStadium from '../CardStadium/Index';

interface MeLikeStadiumProps {}

const MeLikeStadium = ({}: MeLikeStadiumProps) => {
  const { data, isLoading } = useGetLikeStadiumListQuery();
  const [trigger, { isLoading: pageLoading }] = stadiumApi.endpoints.getMoreLikeStadiumList.useLazyQuery();
  const { content, isLast, nextPage } = useSelector((state: RootState) => state.paging);
  const location = useLocation();
  const dispatch = useAppDispatch();

  const fetchNextPage = () => {
    if (isLast) return;
    const page = nextPage ? nextPage : 0;
    trigger(page);
  };

  const $observerTarget = useInfinityScroll(fetchNextPage);
  const likeStadiumList = useMemo(() => content.filter(stadium => stadium.like === true), [content]);

  useEffect(() => {
    return () => {
      dispatch(clearPaging());
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <MeLikeStadiumContainer>
      <TitleWrapper>
        <Title fontSize={`${typo.xxLarge}`} marginTop={'20px'}>
          찜한 체육관
        </Title>
      </TitleWrapper>
      {likeStadiumList!.length ? (
        <LikeStadiumList>
          {likeStadiumList!.map(stadium => (
            <CardStadium key={stadium.name} stadium={stadium} currentLocation={location.pathname} />
          ))}
        </LikeStadiumList>
      ) : (
        <EmptyItemNotification
          message="찜한 체육관이 없습니다"
          btnActive={true}
          btnText={'체육관 보러가기'}
          path={PATH.ROOT}
        />
      )}
      {pageLoading ? <PagingSpinner /> : null}
      <div ref={$observerTarget} />
      <ScrollToTopButton />
    </MeLikeStadiumContainer>
  );
};

export default MeLikeStadium;

const MeLikeStadiumContainer = styled.section`
  ${Responsive.ResponsiveWrapper}
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const LikeStadiumList = styled.div`
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

import { stadiumApi } from '@/api/stadiumApi';
import PATH from '@/constants/path';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import media from '@/lib/styles/media';
import { typo } from '@/lib/styles/typo';
import sw from '@/lib/utils/customSweetAlert';
import { clearPaging } from '@/store/pagingSlice';
import { RootState, useAppDispatch } from '@/store/store';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import CardStadium from '../CardStadium/CardStadium';
import Title from '../common/atoms/Title';
import EmptyItemNotification from '../common/EmptyItemNotification';
import Loading from '../common/Loading/Loading';
import Responsive from '../common/Responsive';
import ScrollToTopButton from '../common/ScrollToTopButton';
import StyledPadding from '../common/StyledPadding';

interface MeLikeStadiumProps {}

const MeLikeStadium = ({}: MeLikeStadiumProps) => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [trigger, { isLoading, error }] = stadiumApi.endpoints.getLikeStadiumList.useLazyQuery();
  const { content, isLast, nextPage } = useSelector((state: RootState) => state.paging);

  const fetchNextPage = () => {
    if (isLast) return;
    const page = nextPage ? nextPage : 0;
    trigger(page.toString());
  };

  const $observerTarget = useInfinityScroll(fetchNextPage);

  useEffect(() => {
    return () => {
      dispatch(clearPaging());
    };
  }, [dispatch]);

  if (error) {
    sw.toast.error('잘못된 요청입니다.');
    console.error('잘못된 요청입니다.');
  }

  if (isLoading) {
    return <Loading />;
  }

  const likeStadiumList = content;
  console.log(likeStadiumList);

  return (
    <MeLikeStadiumBlock>
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
      <div ref={$observerTarget} />
      <StyledPadding />
      <ScrollToTopButton />
    </MeLikeStadiumBlock>
  );
};

export default MeLikeStadium;

const MeLikeStadiumBlock = styled.section`
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

import { useGetLikeStadiumListQuery } from '@/api/stadiumApi';
import media from '@/lib/styles/media';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import CardStadium from '../CardStadium/CardStadium';
import Title from '../common/atoms/Title';
import EmptyItem from '../common/EmptyItemNotification';
import Loading from '../common/Loading/Loading';
import Responsive from '../common/Responsive';
import StyledPadding from '../common/StyledPadding';

interface MeLikeStadiumProps {}

const MeLikeStadium = ({}: MeLikeStadiumProps) => {
  const location = useLocation();
  const { data, isLoading, error } = useGetLikeStadiumListQuery('');

  const likeStadiumList = data?.content;

  useEffect(() => {
    if (error) {
      console.error('잘못된 요청입니다.');
    }
  });

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <MeLikeStadiumBlock>
      <TitleWrapper>
        <Title fontSize={`${typo.xxLarge}`} marginTop={'20px'}>
          찜한 체육관
        </Title>
      </TitleWrapper>
      {likeStadiumList ? (
        <LikeStadiumList>
          {likeStadiumList.map(stadium => {
            return <CardStadium key={stadium.id} stadium={stadium} currentLocation={location.pathname} />;
          })}
        </LikeStadiumList>
      ) : (
        <EmptyItem message="찜한 체육관이 없습니다" />
      )}
      <StyledPadding />
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

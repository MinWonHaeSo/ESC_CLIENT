import media from '@/lib/styles/media';
import { typo } from '@/lib/styles/typo';
import { CurrentStadium, getAccessStadium } from '@/lib/utils/accessStadium';
import styled from '@emotion/styled';
import CardStadium from '../CardStadium/CardStadium';
import Title from '../common/atoms/Title';
import EmptyItem from '../common/EmptyItemNotification';
import Responsive from '../common/Responsive';
import StyledPadding from '../common/StyledPadding';

interface MeRecentSearchProps {}

const MeRecentSearch = ({}: MeRecentSearchProps) => {
  const recentSearchStadiumList: CurrentStadium[] = getAccessStadium('stadiums');

  return (
    <MeRecentSearchBlock>
      <TitleWrapper>
        <Title fontSize={`${typo.xxLarge}`} marginTop={'20px'}>
          최근 본 체육관
        </Title>
      </TitleWrapper>
      {recentSearchStadiumList !== undefined ? (
        <RecentSearchList>
          {recentSearchStadiumList.map(stadium => (
            <CardStadium key={stadium.stadiumId} stadium={stadium} currentLocation={location.pathname} />
          ))}
        </RecentSearchList>
      ) : (
        <EmptyItem message="최근 본 체육관이 없습니다" />
      )}
      <StyledPadding />
    </MeRecentSearchBlock>
  );
};

export default MeRecentSearch;

const MeRecentSearchBlock = styled.section`
  ${Responsive.ResponsiveWrapper}
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const RecentSearchList = styled.ul`
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

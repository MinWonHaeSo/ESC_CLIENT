import styled from '@emotion/styled';
import { CurrentStadium, getAccessStadium } from '@/lib/utils/accessStadium';
import { typo } from '@/lib/styles/typo';
import media from '@/lib/styles/media';
import PATH from '@/constants/path';
import EmptyItemNotification from '../common/EmptyItemNotification';
import ScrollToTopButton from '../common/ScrollToTopButton';
import Responsive from '../common/Responsive';
import Title from '../common/atoms/Title';
import CardStadium from '../CardStadium/Index';

interface MeRecentSearchProps {}

const MeRecentSearch = ({}: MeRecentSearchProps) => {
  const recentSearchStadiumList: CurrentStadium[] = getAccessStadium('stadiums');

  return (
    <MeRecentSearchContainer>
      <TitleWrapper>
        <Title fontSize={`${typo.xxLarge}`} marginTop={'20px'}>
          최근 본 체육관
        </Title>
        <SubDesc>
          최대 10개까지 확인 가능합니다.
          <br />
          찾아본 지 가장 오래된 체육관 순으로 삭제됩니다.
        </SubDesc>
      </TitleWrapper>
      {recentSearchStadiumList !== undefined ? (
        <RecentSearchList>
          {recentSearchStadiumList.map(stadium => (
            <CardStadium key={stadium.stadiumId} stadium={stadium} currentLocation={location.pathname} />
          ))}
        </RecentSearchList>
      ) : (
        <EmptyItemNotification
          message="최근 본 체육관이 없습니다"
          btnActive={true}
          btnText={'체육관 보러가기'}
          path={PATH.ROOT}
        />
      )}
      <ScrollToTopButton />
    </MeRecentSearchContainer>
  );
};

export default MeRecentSearch;

const MeRecentSearchContainer = styled.section`
  ${Responsive.ResponsiveWrapper}
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const SubDesc = styled.p`
  margin-top: 8px;
  font-size: ${typo.small};
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

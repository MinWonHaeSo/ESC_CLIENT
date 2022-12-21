import { typo } from '@/lib/styles/typo';
import { getCookie } from '@/lib/utils/cookies';
import styled from '@emotion/styled';
import { useLocation } from 'react-router';
import CardStadium from '../CardStadium/CardStadium';
import Title from '../common/atoms/Title';
import Responsive from '../common/Responsive';
import StyledPadding from '../common/StyledPadding';
import { stadiumData } from '../MeRentalList/MeRentalStadium';

interface MeRecentSearchProps {}

const MeRecentSearch = ({}: MeRecentSearchProps) => {
  const location = useLocation();

  // [] todo: 최근 본 체육관 상세 정보에 들어갈 때마다, cookie에 해당 정보 저장
  const recentSearchStadiumList = getCookie('recentSearchStadium');

  return (
    <MeRecentSearchBlock>
      <TitleWrapper>
        <Title fontSize={`${typo.xxLarge}`} marginTop={'20px'}>
          최근 본 체육관
        </Title>
      </TitleWrapper>
      <RecentSearchList>
        {stadiumData.map((stadium, idx) => {
          return <CardStadium key={idx} stadium={stadium} currentLocation={location.pathname} />;
        })}
      </RecentSearchList>
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

const RecentSearchList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

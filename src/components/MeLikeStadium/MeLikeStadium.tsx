import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';
import { useLocation } from 'react-router';
import CardStadium from '../CardStadium/CardStadium';
import Title from '../common/atoms/Title';
import Responsive from '../common/Responsive';
import StyledPadding from '../common/StyledPadding';
import { stadiumData } from '../MeRentalList/MeRentalStadium';

const MeLikeStadium = () => {
  const location = useLocation();

  return (
    <MeLikeStadiumBlock>
      <TitleWrapper>
        <Title fontSize={`${typo.xxLarge}`} marginTop={'20px'}>
          찜한 리스트
        </Title>
      </TitleWrapper>
      <LikeStadiumList>
        {stadiumData.map((stadium, idx) => {
          return <CardStadium key={idx} stadium={stadium} currentLocation={location.pathname} />;
        })}
      </LikeStadiumList>
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
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

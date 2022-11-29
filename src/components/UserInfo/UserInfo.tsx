import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';
import Button from '../common/atoms/Button';
import Title from '../common/atoms/Title';
import InsertImage from '../common/InsertImage';
import Responsive from '../common/Responsive';

interface UserInfoProps {}

const UserInfo = (props: UserInfoProps) => {
  return (
    <UserInfoBlock>
      <TitleWrapper>
        <Title fontSize={`${typo.xxLarge}`}>내 정보</Title>
        <Button type="button" size={'medium'} backgroundColor={palette.primary['point']}>
          프로필 편집
        </Button>
      </TitleWrapper>
      <InsertImage />
      <InfoDetailBlock>
        <InfoDetail>
          <InfoDetailTitle>아이디</InfoDetailTitle>
          <p>example@email.com</p>
        </InfoDetail>
        <InfoDetail>
          <InfoDetailTitle>닉네임</InfoDetailTitle>
          <input type="text" placeholder="nickname" />
        </InfoDetail>
      </InfoDetailBlock>
    </UserInfoBlock>
  );
};

export default UserInfo;

const UserInfoBlock = styled.section`
  width: 100%;
  ${Responsive.ResponsiveWrapper}
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const InfoDetailBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 3rem;
  padding: 12px 16px;
  background-color: ${palette.grey[100]};
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const InfoDetail = styled.div`
  display: flex;
  align-items: center;
`;

const InfoDetailTitle = styled.div`
  padding: 6px 12px;
  font-size: ${typo.base};
  border: 1px solid ${palette.grey[400]};
  border-radius: 10px;
`;

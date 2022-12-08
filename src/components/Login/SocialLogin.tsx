import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import GoogleSocialLogin from '../SocialLogin/GoogleSocialLogin';
import KakaoSocialLogin from '../SocialLogin/KakaoSocialLogin';
import NaverSocialLogin from '../SocialLogin/NaverSocialLogin';

interface SocialLoginProps {}

const SocialLogin = (props: SocialLoginProps) => {
  return (
    <SocialLoginBlock>
      <Title>SNS 계정으로 간편 로그인</Title>
      <SocialLink>
        <KakaoSocialLogin />

        <NaverSocialLogin />
        {/* <GoogleSocialLogin /> */}
      </SocialLink>
    </SocialLoginBlock>
  );
};

export default SocialLogin;

const SocialLoginBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
`;

const Title = styled.h3`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${palette.grey[500]};
`;

const SocialLink = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
`;

const SLink = styled(Link)`
  width: 3.2rem;
  height: 3.2rem;
  margin: 0 8px;
  border-radius: 50%;
  border: 1px solid ${palette.grey[300]};

  span {
    display: none;
  }
`;

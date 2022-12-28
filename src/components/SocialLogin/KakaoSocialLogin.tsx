import styled from '@emotion/styled';
import KakaoLogo from '@/assets/KakaoLogo';

const KAKAO_AUTH_URL = `${
  import.meta.env.VITE_BASE_URL
}oauth2/authorization/kakao?redirect_uri=https://d3k8rrzs9omv1v.cloudfront.net/oauth/redirect`;

const KakaoSocialLogin = () => {
  const getAuthToken = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  return (
    <KakaoLoginButton onClick={getAuthToken}>
      <KakaoLogo />
    </KakaoLoginButton>
  );
};

export default KakaoSocialLogin;

const KakaoLoginButton = styled.button`
  padding-top: 6px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #fae100;
`;

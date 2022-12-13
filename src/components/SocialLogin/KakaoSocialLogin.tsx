import KakaoLogo from '@/assets/KakaoLogo';
import styled from '@emotion/styled';

// const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${
//   import.meta.env.VITE_KAKAO_SOCIAL_LOGIN_KEY
// }&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;

const KAKAO_AUTH_URL = `${
  import.meta.env.VITE_BASE_URL
}/oauth2/authorization/kakao?redirect_uri=http://localhost:5173/oauth/redirect`;

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

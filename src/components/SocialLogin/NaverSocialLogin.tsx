import styled from '@emotion/styled';
import NaverLogo from '@/assets/NaverLogo';

const NAVER_AUTH_URL = `${
  import.meta.env.VITE_BASE_URL
}/oauth2/authorization/naver?redirect_uri=https://d3k8rrzs9omv1v.cloudfront.net/oauth/redirect`;

const NaverSocialLogin = () => {
  const getAuthToken = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  return (
    <NaverLoginButton onClick={getAuthToken}>
      <NaverLogo />
    </NaverLoginButton>
  );
};

export default NaverSocialLogin;

const NaverLoginButton = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
`;

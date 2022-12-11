import styled from '@emotion/styled';
import GoogleLogo from '@/assets/GoogleLogo';

// const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_SOCIAL_LOGIN_KEY;

const GOOGLE_CLIENT_ID = `${
  import.meta.env.VITE_BASE_URL
}/oauth2/authorization/google?redirect_uri=http://localhost:5173/oauth/redirect`;

const GoogleSocialLogin = () => {
  const getAuthToken = () => {
    window.location.href = GOOGLE_CLIENT_ID;
  };

  return (
    <GoogleLoginButton onClick={getAuthToken}>
      <GoogleLogo />
    </GoogleLoginButton>
  );
};

export default GoogleSocialLogin;

const GoogleLoginButton = styled.button`
  padding-top: 5px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

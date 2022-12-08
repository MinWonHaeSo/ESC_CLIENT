import { NaverLoginButton } from '@/lib/styles/socialLoginStyle';

const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
  import.meta.env.VITE_NAVER_SOCIAL_LOGIN_CLIENT_ID
}&redirect_uri=${import.meta.env.VITE_NAVER_REDIRECT_URI}`;

const NaverSocialLogin = () => {
  const getAuthToken = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  return (
    <NaverLoginButton onClick={getAuthToken}>
      <svg width="48" height="48" viewBox="0 0 48 48" preserveAspectRatio="xMidYMid meet">
        <g fill="none" fillRule="evenodd">
          <path
            fill="currentColor"
            d="M0 24C0 10.745 10.745 0 24 0s24 10.745 24 24-10.745 24-24 24S0 37.255 0 24z"
          ></path>
          <path fill="#FFF" d="M21 25.231V34h-7V15h7l6 8.769V15h7v19h-7l-6-8.769z"></path>
        </g>
      </svg>
    </NaverLoginButton>
  );
};

export default NaverSocialLogin;

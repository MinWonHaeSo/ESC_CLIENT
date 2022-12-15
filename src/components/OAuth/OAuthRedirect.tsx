import { useSocialLoginMutation } from '@/api/authApi';
import { setCookie } from '@/lib/utils/cookies';
import { setSocialLogin } from '@/store/authSlice';
import { useAppDispatch } from '@/store/store';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import Loading from '../common/Loading/Loading';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from '@/lib/utils/token';

interface DecodedUserInfo {
  email: string;
  exp: number;
  iat: number;
}

const OAuthRedirect = () => {
  const navigate = useNavigate();
  const { social } = useParams<{ social: string }>();

  const dispatch = useAppDispatch();
  const [socialLoginAPI] = useSocialLoginMutation();

  useEffect(() => {
    if (social) {
      getAccessToken(social);
    }
  }, [social]);

  const getAccessToken = async (social: string) => {
    // accessToken
    const accessToken = new URL(window.location.href).searchParams.get('token') as string;

    if (accessToken) {
      const decodedUserInfo: DecodedUserInfo = jwt_decode(accessToken); // 이메일 정보 뽑아내기
      console.log(decodedUserInfo);
      try {
        const userData = await socialLoginAPI({ email: decodedUserInfo.email }).unwrap();

        // cookie에 refreshToken 저장
        setCookie('refreshToken', userData.refreshToken, {
          path: '/',
          secure: true,
        });

        // localStorage에 accessToken 저장
        setAuthToken(accessToken);
        localStorage.setItem('userType', 'USER');

        dispatch(
          setSocialLogin({
            type: 'USER',
            email: decodedUserInfo.email,
            name: userData.name,
            nickname: userData.nickname,
            image: userData.imgUrl,
            accessToken: accessToken,
            refreshToken: userData.refreshToken,
            loggedIn: true,
          }),
        );

        navigate('/');
      } catch {
        console.error('소셜 로그인에 문제가 있습니다.');
        navigate('/login');
      }
    }
  };
  return <Loading />;
};

export default OAuthRedirect;

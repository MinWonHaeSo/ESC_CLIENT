import { useSocialLoginMutation } from '@/api/authApi';
import { setCookie } from '@/lib/utils/cookies';
import { setCredentials, setLogin, setSocialLogin } from '@/store/authSlice';
import { useAppDispatch } from '@/store/store';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import Loading from '../Loading/Loading';
import jwt_decode from 'jwt-decode';

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
        // dispatch(setCredentials({ token: accessToken })); // 전역 상태에 accessToken 정보 저장
        setCookie('refreshToken', userData.refreshToken, {
          path: '/',
          secure: true,
          // httpOnly: true,
        });
        localStorage.setItem('accessToken', accessToken);

        dispatch(
          setSocialLogin({
            type: 'USER',
            email: decodedUserInfo.email,
            name: userData.name,
            nickname: userData.nickName,
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

    return <Loading />;
  };
};

export default OAuthRedirect;

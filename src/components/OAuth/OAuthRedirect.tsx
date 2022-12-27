import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate, useParams } from 'react-router';
import { useSocialLoginMutation } from '@/api/authApi';
import { setSocialLogin } from '@/store/authSlice';
import { useAppDispatch } from '@/store/store';
import { setCookie } from '@/lib/utils/cookies';
import { setAuthToken } from '@/lib/utils/token';
import PATH from '@/constants/path';
import Loading from '../common/Loading/Loading';

interface DecodedUserInfo {
  email: string;
  exp: number;
  iat: number;
}

const OAuthRedirect = () => {
  const navigate = useNavigate();
  const { social } = useParams<{ social: string }>();

  const dispatch = useAppDispatch();
  const [socialLoginAPI, { isLoading }] = useSocialLoginMutation();

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
            id: userData.id,
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

        navigate(`${PATH.ROOT}`);
      } catch {
        console.error('소셜 로그인에 문제가 있습니다.');
        navigate(`${PATH.LOGIN}`);
      }
    }
  };

  return <>{isLoading ? <Loading /> : null}</>;
};

export default OAuthRedirect;

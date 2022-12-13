import { useSocialLoginMutation } from '@/api/authApi';
import { setCookie } from '@/lib/utils/cookies';
import { setCredentials, setLogin } from '@/store/authSlice';
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
  const [socialLogin] = useSocialLoginMutation();

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

      const userData = await socialLogin({ email: decodedUserInfo.email }).unwrap();
      dispatch(setCredentials({ token: accessToken })); // 전역 상태에 user 정보, accessToken 정보 저장
      setCookie('refreshToken', userData.refreshToken, {
        path: '/',
        secure: true,
        // httpOnly: true,
      });

      dispatch(
        setLogin({
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
    }

    return <Loading />;
  };
};

export default OAuthRedirect;

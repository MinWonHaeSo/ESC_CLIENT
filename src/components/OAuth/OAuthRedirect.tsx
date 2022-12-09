import { useGetSocialLoginQuery } from '@/api/authApi';
import { setCookie } from '@/lib/utils/manageCookies';
import { checkLoggedIn, setCredentials } from '@/store/authSlice';
import { useAppDispatch } from '@/store/store';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import Loading from '../Loading/Loading';
import jwt_decode from 'jwt-decode';

const OAuthRedirect = () => {
  const navigate = useNavigate();
  const { social } = useParams<{ social: string }>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (social) {
      getAccessToken(social);
    }
  }, [social]);

  const getAccessToken = async (social: string) => {
    // 인가코드
    const accessToken = new URL(window.location.href).searchParams.get('token') as string;
    console.log(accessToken);
    if (accessToken) {
      const decodedUserInfo = jwt_decode(accessToken); // 이메일 정보 뽑아내기
      dispatch(setCredentials({ user: decodedUserInfo, token: accessToken })); // 전역 상태에 user 정보, accessToken 정보 저장
      dispatch(checkLoggedIn(true));
      // refresh token은 baseQueryReauth 부분에서 accessToken이 만료되어 없을 경우 ,
      // refreshToken이 브라우저 전역 상 set-cookie에 담겨 있으므로 굳이 저장하지 않아도되는지 확인해야함.
      // setCookie('refreshToken', refreshToken, {
      //   path: '/',
      //   secure: true,
      //   httpOnly: true,
      // });
    }
    // try {
    //   const { data, isLoading, error } = useGetSocialLoginQuery({ social: social, token: accessToken });
    //   if (data) {
    //     const { refreshToken } = data;
    //     const decodedUserInfo = jwt_decode(accessToken);
    //     setCookie('refreshToken', refreshToken, {
    //       path: '/',
    //       secure: true,
    //       httpOnly: true,
    //     });
    //     // decode한 user의 이메일에 저장
    //     // loggedin한 상태로 저장
    //     // accessToken 만료 시 refresh token 보내어 어떻게 accessToken을 다시 받아올 지 생각
    //   }
    // } catch {
    //   console.error('전달받은 토큰이 없습니다.');
    //   navigate('/login');
    // }

    navigate('/');
  };
  return <Loading />;
};

export default OAuthRedirect;

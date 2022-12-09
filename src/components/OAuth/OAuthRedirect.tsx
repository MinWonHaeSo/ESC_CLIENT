import { useGetSocialLoginQuery } from '@/api/authApi';

import { setCookie } from '@/lib/utils/manageCookies';
import { setCredentials } from '@/store/authSlice';
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
    let accessToken = new URL(window.location.href).searchParams.get('token') as string;
    console.log(accessToken);
    try {
      const { data, isLoading, error } = useGetSocialLoginQuery({ social: social, token: accessToken });
      if (data) {
        const { refreshToken } = data;
        const decodedUserInfo = jwt_decode(accessToken);
        setCookie('refreshToken', refreshToken, {
          path: '/',
          secure: true,
          httpOnly: true,
        });
        dispatch(setCredentials({ user: decodedUserInfo, token: accessToken }));
        // decode한 user의 이메일에 저장
        // loggedin한 상태로 저장
        // accessToken 만료 시 refresh token 보내어 어떻게 accessToken을 다시 받아올 지 생각
      }
    } catch {
      console.error('전달받은 토큰이 없습니다.');
      navigate('/login');
    }

    navigate('/');
  };
  return <Loading />;
};

export default OAuthRedirect;

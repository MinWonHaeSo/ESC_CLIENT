import { useGetSocialLoginQuery } from '@/api/authApi';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import Loading from '../Loading/Loading';

const OAuthRedirect = () => {
  const navigate = useNavigate();
  const { social } = useParams<{ social: string }>();
  // 인가코드
  console.log(social);

  useEffect(() => {
    if (social) {
      getAccessToken(social);
    }
  }, [social]);

  const getAccessToken = async (social: string) => {
    let token = new URL(window.location.href).searchParams.get('token') as string;
    console.log(token);
    try {
      const { data, isLoading } = useGetSocialLoginQuery({ social: social, token: token });
      console.log(data);
    } catch {}
  };
  return <Loading />;
};

export default OAuthRedirect;

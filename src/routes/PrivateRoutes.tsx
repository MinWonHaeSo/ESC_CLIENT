import { getCookie } from '@/lib/utils/cookies';
import sw from '@/lib/utils/customSweetAlert';
import { getAuthToken } from '@/lib/utils/token';
import { Navigate, Outlet } from 'react-router';

interface PrivateRouteProps {
  children?: React.ReactNode;
}

const PrivateRoute = ({}: PrivateRouteProps) => {
  const accessToken = getAuthToken();
  const refreshToken = getCookie('refreshToken');

  if (!accessToken || !refreshToken) {
    sw.toast.error('권한이 없습니다.');
  }

  return accessToken && refreshToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

import { getCookie } from '@/lib/utils/cookies';
import { getAuthToken } from '@/lib/utils/token';
import { Navigate, Outlet } from 'react-router';

interface PrivateRouteProps {
  children?: React.ReactNode;
}

const PrivateRoute = ({}: PrivateRouteProps) => {
  const accessToken = getAuthToken();
  const refreshToken = getCookie('refreshToken');

  return accessToken && refreshToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

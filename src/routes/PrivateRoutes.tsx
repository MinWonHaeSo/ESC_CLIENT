import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

interface PrivateRouteProps {
  children?: React.ReactNode;
}

const PrivateRoute = ({}: PrivateRouteProps) => {
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  return accessToken && loggedIn ? <Outlet /> : <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;

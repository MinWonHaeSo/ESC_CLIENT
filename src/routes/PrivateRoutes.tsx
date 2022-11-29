import sw from '@/lib/utils/customSweetAlert';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

interface PrivateRouteProps {
  children?: React.ReactNode;
}

const PrivateRoute = ({}: PrivateRouteProps) => {
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);
  if (!loggedIn) {
    sw.toast.error('올바른 접근이 아닙니다.');
  }
  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

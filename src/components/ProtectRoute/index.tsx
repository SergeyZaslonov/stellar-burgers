import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';
import { getIsAuthChecked, getUserInfo } from '../../services/slices/userSlice';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps): React.ReactElement => {
  const isAuthChecked = useSelector(getIsAuthChecked);
  const user = useSelector(getUserInfo);
  const location = useLocation();

  if (!isAuthChecked) return <Preloader />;
  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }
  if (onlyUnAuth && user) {
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  return children;
};

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({
  children
}: {
  children: React.ReactElement;
}): React.ReactElement => <ProtectedRoute onlyUnAuth children={children} />;

import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/slices/user/user.selectors';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);
  return (
    authStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}


export default PrivateRoute;

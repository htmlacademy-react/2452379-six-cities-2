import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/slices/user/user.selectors';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
};

function PrivateRoute({ authorizationStatus, children }: PrivateRouteProps): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);
  return (
    authStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}


export default PrivateRoute;

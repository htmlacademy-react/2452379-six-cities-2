import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthFetchStatus } from '../../store/slices/user/user.selectors';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const { isFulfilled, isRejected } = useAppSelector(getAuthFetchStatus);
  return (
    (isFulfilled && children)
    || (isRejected && <Navigate to={AppRoute.LogIn} />)
    || <div />
  );
}


export default PrivateRoute;

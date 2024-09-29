import { AuthorizationStatus } from '../const';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getAuthStatus } from '../store/slices/user/user.selectors';
import { logOutThunk } from '../store/slices/user/user.thunks';

type WithLogOutThunkProps = {
  children: JSX.Element | JSX.Element[];
}

export default function WithLogOutThunk({ children }: WithLogOutThunkProps) {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);
  const isLoggedIn = authStatus === AuthorizationStatus.Auth;

  if (isLoggedIn) {
    dispatch(logOutThunk());
  }

  return children;
}

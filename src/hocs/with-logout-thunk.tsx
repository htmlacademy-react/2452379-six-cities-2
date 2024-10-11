import { useAppDispatch, useAppSelector } from '../hooks';
import { getIsAuthorized } from '../store/slices/user/user.selectors';
import { logOutThunk } from '../store/slices/user/user.thunks';

type WithLogOutThunkProps = {
  children: JSX.Element;
}

export default function WithLogOutThunk({ children }: WithLogOutThunkProps) {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(getIsAuthorized);

  if (isAuthorized) {
    dispatch(logOutThunk());
  }

  return children;
}

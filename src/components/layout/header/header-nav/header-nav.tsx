import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../../../const';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { getAuthStatus, getUserEmail } from '../../../../store/slices/user/user.selectors';
import { logOutThunk } from '../../../../store/slices/user/user.thunks';

function HeaderNav(): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);
  const email = useAppSelector(getUserEmail);

  const isLoggedIn = authStatus === AuthorizationStatus.Auth;

  const handleSignOutClick = () => {
    dispatch(logOutThunk());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {
          isLoggedIn
            ? (
              <>
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">{email}</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li onClick={handleSignOutClick} className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </>
            )
            :
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                <span className="header__login">Sign in</span>
              </Link>
            </li>
        }
      </ul>
    </nav>
  );
}

export default HeaderNav;

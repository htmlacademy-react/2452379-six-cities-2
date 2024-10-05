import { Link } from 'react-router-dom';
import { AppRoute } from '../../../../const';
import { useAppSelector } from '../../../../hooks';
import { getIsAuthorized } from '../../../../store/slices/user/user.selectors';
import User from '../../../user/user';


function HeaderNav(): JSX.Element {
  const isAuthorized = useAppSelector(getIsAuthorized);

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {
          isAuthorized
            ? (
              <>
                <User />
                <li className="header__nav-item">
                  <Link className="header__nav-link" to={AppRoute.LogOut}>
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </>
            )
            :
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={AppRoute.LogIn}>
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

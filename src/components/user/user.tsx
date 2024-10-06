import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getFavoriteOffers, getIsLoadingOf } from '../../store/slices/offers/offers.selectors';
import { getUserEmail } from '../../store/slices/user/user.selectors';

export default function User(): JSX.Element {
  const isLoading = useAppSelector(getIsLoadingOf('favoriteOffers'));
  const { length: favoriteOffersCount } = useAppSelector(getFavoriteOffers);
  const email = useAppSelector(getUserEmail);

  return (
    <li className='header__nav-item user'>
      <Link className='header__nav-link header__nav-link--profile' to={AppRoute.Favorites}>
        <div className='header__avatar-wrapper user__avatar-wrapper'>
        </div>
        <span className='header__user-name user__name'>{email}</span>
        <span className='header__favorite-count'>
          {
            isLoading
              ? '...'
              : favoriteOffersCount
          }
        </span>
      </Link>
    </li>
  );
}

import { useAppSelector } from '../../hooks';
import FavoritesEmpty from '../../pages/favorites-page/favorites-empty/favorites-empty';
import { getFavoriteOffers } from '../../store/slices/offers/offers.selectors';
import FavoritesList from '../favorites-list/favorites-list';

export default function Favorites(): JSX.Element {
  const offers = useAppSelector(getFavoriteOffers);

  const isEmpty = offers.length === 0;

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        {
          isEmpty
            ? <FavoritesEmpty />
            : <FavoritesList offers={offers} />
        }
      </div>
    </main>
  );
}

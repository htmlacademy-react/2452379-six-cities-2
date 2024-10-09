import clsx from 'clsx';
import FavoritesEmpty from './favorites-empty/favorites-empty';
import FavoritesList from './favorites-list/favorites-list';
import { Offer } from '../../types/offer';

type FavoritesProps = {
  offers: Offer[];
}

export default function Favorites({ offers }: FavoritesProps): JSX.Element {
  const isEmpty = offers.length === 0;

  return (
    <main className={clsx('page__main page__main--favorites', isEmpty && 'page__main--favorites-empty')} data-testid="Favorites">
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

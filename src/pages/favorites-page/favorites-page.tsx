import clsx from 'clsx';
import Favorites from '../../components/favorites/favorites';
import Layout from '../../components/layout/layout';
import Loading, { LoadingProps } from '../../components/loading/loading';
import { useAppSelector } from '../../hooks';
import { getFavoriteOffers, getOffersStateFetchStatusOf } from '../../store/slices/offers/offers.selectors';

const loadingProps: LoadingProps = {
  mainColor: '#4d81af',
  secondaryColor: '#f0f0f0',
  speed: 100,
  still: false,
  thickness: 100
};

export default function FavoritesPage(): JSX.Element {
  const offers = useAppSelector(getFavoriteOffers);
  const { isLoading } = useAppSelector(getOffersStateFetchStatusOf('favoriteOffers'));
  const isEmpty = offers.length === 0;

  return (
    <Layout className={clsx(isEmpty && 'page--favorites-empty')} footer>
      {
        isLoading
          ? <Loading {...loadingProps} />
          : <Favorites offers={offers} />
      }
    </Layout>
  );
}

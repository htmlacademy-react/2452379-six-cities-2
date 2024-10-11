import clsx from 'clsx';
import Favorites from '../../components/favorites/favorites';
import Layout from '../../components/layout/layout';
import Loader, { LoaderProps } from '../../components/loader/loader';
import { useAppSelector } from '../../hooks';
import { getFavoriteOffers, getIsLoadingOf } from '../../store/slices/offers/offers.selectors';

const loaderProps: LoaderProps = {
  mainColor: '#4d81af',
  secondaryColor: '#f0f0f0',
  speed: 100,
  still: false,
  thickness: 100
};

export default function FavoritesPage(): JSX.Element {
  const offers = useAppSelector(getFavoriteOffers);
  const isLoading = useAppSelector(getIsLoadingOf('favoriteOffers'));
  const isEmpty = offers.length === 0;

  return (
    <Layout className={clsx(isEmpty && 'page--favorites-empty')} footer>
      {
        isLoading
          ? <Loader {...loaderProps} />
          : <Favorites offers={offers} />
      }
    </Layout>
  );
}

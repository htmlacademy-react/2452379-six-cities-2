import Favorites from '../../components/favorites/favorites';
import Layout from '../../components/layout/layout';
import Loading, { LoadingProps } from '../../components/loading/loading';
import { useAppSelector } from '../../hooks';
import { getOffersStateFetchStatusOf } from '../../store/slices/offers/offers.selectors';

const loadingProps: LoadingProps = {
  mainColor: '#4d81af',
  secondaryColor: '#f0f0f0',
  speed: 100,
  still: false,
  thickness: 100,
  svgProps: {}
};

export default function FavoritesPage(): JSX.Element {
  const { isLoading } = useAppSelector(getOffersStateFetchStatusOf('favoriteOffers'));

  return (
    <Layout footer>
      {
        isLoading
          ? <Loading {...loadingProps} />
          : <Favorites />
      }
    </Layout>
  );
}

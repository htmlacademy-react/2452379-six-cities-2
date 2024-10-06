import clsx from 'clsx';
import AvailableLocations from '../../components/cities/available-locations/available-locations';
import Cities from '../../components/cities/cities';
import Layout from '../../components/layout/layout';
import Loading, { LoadingProps } from '../../components/loading/loading';
import { useAppSelector } from '../../hooks';
import { getIsEmptyOf, getIsLoadingOf } from '../../store/slices/offers/offers.selectors';

const loadingProps: LoadingProps = {
  mainColor: '#4d81af',
  secondaryColor: '#f0f0f0',
  speed: 100,
  still: false,
  thickness: 100
};


export default function MainPage(): JSX.Element {
  const isLoading = useAppSelector(getIsLoadingOf('offers'));
  const isEmpty = useAppSelector(getIsEmptyOf('offers'));

  return (
    <Layout className="page--gray page--main">
      <main className={clsx('page__main page__main--index', isEmpty && 'page__main--index-empty')}>
        <AvailableLocations />
        {
          isLoading
            ? <Loading {...loadingProps} />
            : <Cities />
        }
      </main>
    </Layout>
  );
}

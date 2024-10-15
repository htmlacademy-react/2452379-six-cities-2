import clsx from 'clsx';
import AvailableLocations from '../../components/available-locations/available-locations';
import Cities from '../../components/cities/cities';
import Layout from '../../components/layout/layout';
import Loader, { LoaderProps } from '../../components/loader/loader';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsEmptyOf, getIsLoadingOf } from '../../store/slices/offers/offers.selectors';
import { useEffect } from 'react';
import { setActiveOffer } from '../../store/slices/offers/offers.slice';

const loaderProps: LoaderProps = {
  mainColor: '#4d81af',
  secondaryColor: '#f0f0f0',
  speed: 100,
  still: false,
  thickness: 100
};


export default function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getIsLoadingOf('offers'));
  const isEmpty = useAppSelector(getIsEmptyOf('offers'));

  useEffect(() => () => {
    dispatch(setActiveOffer(null));
  });

  return (
    <Layout className="page--gray page--main">
      <main className={clsx('page__main page__main--index', isEmpty && 'page__main--index-empty')} data-testid="MainPage">
        <AvailableLocations />
        {
          isLoading
            ? <Loader {...loaderProps} />
            : <Cities />
        }
      </main>
    </Layout>
  );
}

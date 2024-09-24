import { useMemo } from 'react';
import Map from '../map/map';
import CitiesEmpty from './cities-empty/cities-empty';
import { useAppDispatch, useAppSelector } from '../../hooks';
import clsx from 'clsx';
import AvailableLocations from '../available-locations/available-locations';
import Places from '../places/places';
import { getIsLoading, getOffers } from '../../store/offers-process/offers-process.selectors';
import { getCity, getSortedCityOffers } from '../../store/cities-process/cities-process.selectors';
import { getSortType } from '../../store/sort-process/sort-process.selectors';
import { setActiveOffer } from '../../store/offers-process/offers-process.slice';

export default function Cities(): JSX.Element {
  const dispatch = useAppDispatch();
  const city = useAppSelector(getCity);
  const offers = useAppSelector(getOffers);
  const sortType = useAppSelector(getSortType);
  const isLoading = useAppSelector(getIsLoading);
  const sortedCityOffers = useMemo(() => getSortedCityOffers({offers, city, sortType}), [offers, city, sortType]);

  const isEmpty = sortedCityOffers.length === 0;

  return (
    <main className={clsx('page__main page__main--index', isEmpty && 'page__main--index-empty')}>
      <AvailableLocations />
      <div className="cities">
        {
          isEmpty
            ? <CitiesEmpty isLoading={isLoading} />
            : (
              <div className="cities__places-container container">
                <Places offers={sortedCityOffers} onActivePlaceChange={(activeOffer) => dispatch(setActiveOffer(activeOffer))} />
                <div className="cities__right-section">
                  <Map
                    className="cities__map"
                    offers={sortedCityOffers}
                    anchor={sortedCityOffers[0].city.location}
                    mapOptions={{ zoomControl: false }}
                  />
                </div>
              </div>
            )
        }
      </div>
    </main>
  );
}

import Map from '../map/map';
import CitiesEmpty from './cities-empty/cities-empty';
import { useAppDispatch, useAppSelector } from '../../hooks';
import clsx from 'clsx';
import AvailableLocations from '../available-locations/available-locations';
import Places from '../places/places';
import { getSortedCityOffers } from '../../store/slices/app/app.selectors';
import { getIsLoading } from '../../store/slices/offers/offers.selectors';
import { setActiveOffer } from '../../store/slices/offers/offers.slice';

export default function Cities(): JSX.Element {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getIsLoading);
  const sortedCityOffers = useAppSelector(getSortedCityOffers);

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

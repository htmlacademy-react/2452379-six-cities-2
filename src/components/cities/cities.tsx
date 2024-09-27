import Map from '../map/map';
import CitiesEmpty from './cities-empty/cities-empty';
import { useAppDispatch, useAppSelector } from '../../hooks';
import clsx from 'clsx';
import AvailableLocations from './available-locations/available-locations';
import Places from '../places/places';
import { getSortedCityOffers } from '../../store/slices/app/app.selectors';
import { getOffersStatus } from '../../store/slices/offers/offers.selectors';
import { setActiveOffer } from '../../store/slices/offers/offers.slice';
import { Offer } from '../../types/offer';

export default function Cities(): JSX.Element {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(getOffersStatus);
  const sortedCityOffers = useAppSelector(getSortedCityOffers);

  const isEmpty = sortedCityOffers.length === 0;

  const handleActivePlaceChange = (activeOffer: Offer | null) => dispatch(setActiveOffer(activeOffer));

  return (
    <main className={clsx('page__main page__main--index', isEmpty && 'page__main--index-empty')}>
      <AvailableLocations />
      <div className="cities">
        {
          isEmpty
            ? <CitiesEmpty isLoading={isLoading} />
            : (
              <div className="cities__places-container container">
                <Places offers={sortedCityOffers} onActivePlaceChange={handleActivePlaceChange} />
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

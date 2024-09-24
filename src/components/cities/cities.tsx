import { useState } from 'react';
import { Offer } from '../../types/offer';
import Map from '../map/map';
import CitiesEmpty from './cities-empty/cities-empty';
import { useAppSelector } from '../../hooks';
import clsx from 'clsx';
import AvailableLocations from '../available-locations/available-locations';
import Places from '../places/places';
import { getIsLoading, getOffers } from '../../store/offers-process/offers-process.selectors';
import { getCity } from '../../store/cities-process/cities-process.selectors';

export default function Cities(): JSX.Element {
  const offers = useAppSelector(getOffers);
  const city = useAppSelector(getCity);
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const cityOffers = offers.filter((offer) => offer.city.name === city);
  const isLoading = useAppSelector(getIsLoading);
  const isEmpty = cityOffers.length === 0;

  return (
    <main className={clsx('page__main page__main--index', isEmpty && 'page__main--index-empty')}>
      <AvailableLocations currentLocation={city} />
      <div className="cities">
        {
          isEmpty
            ? <CitiesEmpty isLoading={isLoading} />
            : (
              <div className="cities__places-container container">
                <Places offers={cityOffers} onActivePlaceChange={setActiveOffer} />
                <div className="cities__right-section">
                  <Map
                    className="cities__map"
                    activeOffer={activeOffer}
                    offers={cityOffers}
                    anchor={cityOffers[0].city.location}
                    mapOptions={{ zoomControl: false }}
                    flyToActive
                  />
                </div>
              </div>
            )
        }
      </div>
    </main>
  );
}

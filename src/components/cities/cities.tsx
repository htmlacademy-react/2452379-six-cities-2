import { useState } from 'react';
import { Offer } from '../../types/offer';
import Map from '../map/map';
import CitiesEmpty from './cities-empty/cities-empty';
import { useAppSelector } from '../../hooks';
import clsx from 'clsx';
import AvailableLocations from '../available-locations/available-locations';
import Places from '../places/places';

export default function Cities(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const city = useAppSelector((state) => state.city);
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const cityOffers = offers.filter((offer) => offer.city.name === city);
  const isEmpty = cityOffers.length === 0;

  return (
    <main className={clsx('page__main page__main--index', isEmpty && 'page__main--index-empty')}>
      <AvailableLocations currentLocation={city} />
      <div className="cities">
        {
          isEmpty
            ? <CitiesEmpty />
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

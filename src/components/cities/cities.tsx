import { useState } from 'react';
import { Offer } from '../../types/offer';
import Map from '../map/map';
import PlacesList from '../places-list/places-list';
import PlacesSortForm from '../places-sort-form/places-sort-form';
import CitiesEmpty from './cities-empty/cities-empty';
import { useAppSelector } from '../../hooks';
import clsx from 'clsx';
import AvailableLocations from '../available-locations/available-locations';

type CitiesProps = {
  offers: Offer[];
}

export default function Cities({ offers }: CitiesProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const city = useAppSelector((state) => state.city);
  const cityOffers = offers.filter((offer) => offer.city.name === city);
  const isEmpty = cityOffers.length === 0;

  return (
    <main className={clsx('page__main page__main--index', isEmpty && 'page__main--index-empty')}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <AvailableLocations currentLocation={city} />
      </div>
      <div className="cities">
        {
          isEmpty
            ?
            <CitiesEmpty />
            :
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{cityOffers.length} places to stay in {cityOffers[0].city.name}</b>
                <PlacesSortForm />
                <PlacesList onActiveCardChange={setActiveOffer} offers={cityOffers} displayType={'main'} />
              </section>
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
        }
      </div>
    </main>
  );
}

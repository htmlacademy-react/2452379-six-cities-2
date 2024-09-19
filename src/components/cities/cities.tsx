import { useState } from 'react';
import { Offer } from '../../types/offer';
import Map from '../map/map';
import PlacesList from '../places-list/places-list';
import PlacesSortForm from '../places-sort-form/places-sort-form';
import CitiesEmpty from './cities-empty/cities-empty';

type CitiesProps = {
  offers: Offer[];
}

export default function Cities({ offers }: CitiesProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const isEmpty = offers.length === 0;

  return (
    <div className="cities">
      {
        isEmpty
          ?
          <CitiesEmpty />
          :
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {offers[0].city.name}</b>
              <PlacesSortForm />
              <PlacesList onActiveCardChange={setActiveOffer} offers={offers} displayType={'main'} />
            </section>
            <div className="cities__right-section">
              <Map
                className="cities__map"
                activeOffer={activeOffer}
                offers={offers}
                anchor={offers[0].city.location}
                mapOptions={{ zoomControl: false }}
                flyToActive
              />
            </div>
          </div>
      }
    </div>
  );
}

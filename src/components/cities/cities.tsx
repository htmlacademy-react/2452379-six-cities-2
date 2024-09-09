import { useState } from 'react';
import { Offer } from '../../types/offer';
import Map from '../map/map';
import PlacesList from '../places-list/places-list';
import PlacesSortForm from '../places-sort-form/places-sort-form';
import { ActiveCardId } from '../../types/place-card';

type CitiesProps = {
  offers: Offer[];
  city: string;
}

export default function Cities({ offers, city }: CitiesProps): JSX.Element {
  const [activeCardId, setActiveCard] = useState<ActiveCardId>(null);

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} places to stay in {city}</b>

          <PlacesSortForm />

          <PlacesList onActiveCardChange={setActiveCard} offers={offers} displayType={'main'}></PlacesList>
        </section>
        <div className="cities__right-section">
          <Map activeCardId={activeCardId} displayType='main' />
        </div>
      </div>
    </div>
  );
}

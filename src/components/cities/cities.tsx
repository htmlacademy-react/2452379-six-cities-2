import { useState } from 'react';
import { Offer } from '../../types/offer';
import Map from '../map/map';
import PlacesList from '../places-list/places-list';
import PlacesSortForm from '../places-sort-form/places-sort-form';
import { ActiveCardId } from '../../types/place-card';
import clsx from 'clsx';

type CitiesProps = {
  offers: Offer[];
  city: string;
}

export default function Cities({ offers, city }: CitiesProps): JSX.Element {
  const [activeCardId, setActiveCard] = useState<ActiveCardId>(null);
  const isFound = offers.length > 0;

  return (
    <div className="cities">
      <div className={clsx('cities__places-container container', !isFound && 'cities__places-container--empty')}>
        <section className={clsx(isFound && 'cities__places places', !isFound && 'cities__no-places')}>
          {
            isFound
              ?
              <>
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} places to stay in {city}</b>
                <PlacesSortForm />
                <PlacesList onActiveCardChange={setActiveCard} offers={offers} displayType={'main'}></PlacesList>
              </>
              :
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">We could not find any property available at the moment in {city}</p>
              </div>
          }
        </section>
        <div className="cities__right-section">
          {
            isFound && <Map activeCardId={activeCardId} city={offers[0].city.location} offers={offers} displayType='main' />
          }
        </div>
      </div>
    </div>
  );
}

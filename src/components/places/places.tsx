import { useState } from 'react';
import { offersSortTypes } from '../../const';
import { Offer } from '../../types/offer';
import { OfferSortType } from '../../types/sort';
import PlacesList from '../places-list/places-list';
import PlacesSortForm from '../places-sort-form/places-sort-form';

type PlacesProps = {
  offers: Offer[];
  onActivePlaceChange?: (offer: Offer | null) => void;
}

export default function Places({ offers, onActivePlaceChange }: PlacesProps): JSX.Element {
  const [sortType, setSortType] = useState<OfferSortType>('Popular');
  const sortedOffers = [...offers].sort(offersSortTypes[sortType]);

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offers.length} places to stay in {offers[0].city.name}</b>
      <PlacesSortForm type={sortType} onSortChange={setSortType} />
      <PlacesList onActivePlaceChange={onActivePlaceChange} offers={sortedOffers} displayType={'main'} />
    </section>
  );
}

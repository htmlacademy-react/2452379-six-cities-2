import { Offer } from '../../types/offer';
import PlacesList from '../places-list/places-list';
import PlacesSortForm from '../places-sort-form/places-sort-form';

type PlacesProps = {
  offers: Offer[];
  onActivePlaceChange?: (offer: Offer | null) => void;
}

export default function Places({ offers, onActivePlaceChange }: PlacesProps): JSX.Element {
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offers.length} places to stay in {offers[0].city.name}</b>
      <PlacesSortForm />
      <PlacesList onActivePlaceChange={onActivePlaceChange} offers={offers} displayType={'main'} />
    </section>
  );
}

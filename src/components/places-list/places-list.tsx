import { Offer } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
  offers: Offer[];
  isFavoritePage: boolean;
}

function PlacesList({ offers, isFavoritePage }: PlacesListProps): JSX.Element {
  const cards = offers.map((offer) =>
    <PlaceCard key={offer.id} offer={offer} isFavoritePage={isFavoritePage}></PlaceCard>
  );
  return (
    <div className="cities__places-list places__list tabs__content">
      {cards}
    </div>
  );
}

export default PlacesList;

import { Offer } from '../../types/offer';
import { PlaceCardDisplayType } from '../../types/place-card';
import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
  offers: Offer[];
  displayType: PlaceCardDisplayType;
  onActiveCardChange?: (offer: Offer | null) => void;
}

const displayTypesClassNames: Record<PlaceCardDisplayType, string> = {
  'main': 'cities__places-list places__list',
  'favorite': 'favorites__places',
  'offer': 'near-places__list places__list'
};

function PlacesList({ offers, displayType, onActiveCardChange }: PlacesListProps): JSX.Element {
  const handleCardMouseEvent = onActiveCardChange && ((offer: Offer | null = null) => {
    onActiveCardChange(offer);
  });

  const cards = offers.map((offer) =>
    <PlaceCard onCardMouseEnter={handleCardMouseEvent} onCardMouseLeave={handleCardMouseEvent} key={offer.id} offer={offer} displayType={displayType}></PlaceCard>
  );

  return (
    <div className={displayTypesClassNames[displayType]}>
      {cards}
    </div>
  );
}

export default PlacesList;

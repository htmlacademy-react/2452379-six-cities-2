import clsx from 'clsx';
import { Offer } from '../../types/offer';
import { ActiveCardId, PlaceCardDisplayType } from '../../types/place-card';
import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
  offers: Offer[];
  displayType: PlaceCardDisplayType;
  onActiveCardChange?: (id: ActiveCardId) => void;
}

function PlacesList({ offers, displayType, onActiveCardChange }: PlacesListProps): JSX.Element {
  const handleCardMouseEvent = onActiveCardChange && ((id: ActiveCardId = null) => {
    onActiveCardChange(id);
  });

  const cards = offers.map((offer) =>
    <PlaceCard onCardMouseEnter={handleCardMouseEvent} onCardMouseLeave={handleCardMouseEvent} key={offer.id} offer={offer} displayType={displayType}></PlaceCard>
  );

  return (
    <div className={clsx(displayType === 'main' && 'cities__places-list places__list', displayType === 'favorite' && 'favorites__places')}>
      {cards}
    </div>
  );
}

export default PlacesList;

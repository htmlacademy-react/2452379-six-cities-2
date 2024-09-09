import clsx from 'clsx';
import { Offer, OfferId } from '../../types/offer';
import { PlaceCardDisplayType } from '../../types/place-card';
import PlaceCard from '../place-card/place-card';
import { useState } from 'react';

type PlacesListProps = {
  offers: Offer[];
  displayType: PlaceCardDisplayType;
  onActiveCardChange?: (id: OfferId | null) => void;
}

function PlacesList({ offers, displayType, onActiveCardChange }: PlacesListProps): JSX.Element {
  const [, setActiveCard] = useState<OfferId | null>(null);

  const handleCardMouseEvent = onActiveCardChange && ((id: OfferId | null = null) => {
    onActiveCardChange(id);
    setActiveCard(id);
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

import clsx from 'clsx';
import { Offer } from '../../types/offer';
import { PlaceCardDisplayType } from '../../types/place-card';
import PlaceCard from '../place-card/place-card';
import { useState } from 'react';

type PlacesListProps = {
  offers: Offer[];
  displayType: PlaceCardDisplayType;
}

function PlacesList({ offers, displayType }: PlacesListProps): JSX.Element {
  const [, setActiveCard] = useState<string | null>(null);

  const cardMouseOverHandler = (id: string) => {
    setActiveCard(id);
  };
  const cardMouseLeaveHandler = () => {
    setActiveCard(null);
  };

  const cards = offers.map((offer) =>
    <PlaceCard onCardMouseOver={cardMouseOverHandler} onCardMouseLeave={cardMouseLeaveHandler} key={offer.id} offer={offer} displayType={displayType}></PlaceCard>
  );

  return (
    <div className={clsx(displayType === 'main' && 'cities__places-list places__list', displayType === 'favorite' && 'favorites__places')}>
      {cards}
    </div>
  );
}

export default PlacesList;

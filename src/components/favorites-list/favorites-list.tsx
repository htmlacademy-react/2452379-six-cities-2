import { Offer } from '../../types/offer';
import FavoritesItem from '../favorite-item/favorite-item';

type FavoritesListProps = {
  offers: Offer[];
}

export default function FavoritesList({ offers }: FavoritesListProps) {
  const cityOffersMap = new Map<string, Offer[]>();

  offers.forEach((offer) => {
    const city = cityOffersMap.get(offer.city.name);
    if(!city){
      cityOffersMap.set(offer.city.name, [ offer ]);
    } else {
      city.push(offer);
    }
  });

  const favoritesItems = Array.from(cityOffersMap, ([city, cityOffers]) =>
    <FavoritesItem key={city} city={city} offers={cityOffers} />
  );

  return (
    <ul className="favorites__list">
      {favoritesItems}
    </ul>
  );
}

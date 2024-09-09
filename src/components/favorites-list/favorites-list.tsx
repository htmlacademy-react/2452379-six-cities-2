import { Offer } from '../../types/offer';
import FavoritesItem from '../favorite-item/favorite-item';

type FavoritesListProps = {
  offers: Offer[];
}

export default function FavoritesList({ offers }: FavoritesListProps) {
  const cityOffers: Record<string, Offer[]> = {};

  offers.forEach((offer) => {
    if(!cityOffers[offer.city.name]){
      cityOffers[offer.city.name] = [ offer ];
    } else {
      cityOffers[offer.city.name].push(offer);
    }
  });

  const favoritesItems:JSX.Element[] = [];

  for(const city in cityOffers) {
    favoritesItems.push(<FavoritesItem key={city} city={city} offers={cityOffers[city]} />);
  }

  return (
    <ul className="favorites__list">
      {favoritesItems}
    </ul>
  );
}

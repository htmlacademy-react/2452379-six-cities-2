import { Offer } from '../../types/offer';
import FavoritesItem from '../favorite-item/favorite-item';

type FavoritesListProps = {
  offers: Offer[];
}

export default function FavoritesList({ offers }: FavoritesListProps) {
  const favoritesItems = [...new Set(offers.map((offer) => offer.city.name))].map((city) =>
    <FavoritesItem key={city} city={city} offers={offers.filter((offer) => offer.city.name === city)} />
  );

  return (
    <ul className="favorites__list">
      {favoritesItems}
    </ul>
  );
}

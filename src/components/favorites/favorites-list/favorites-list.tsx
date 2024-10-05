import { CityName } from '../../../types/city';
import { Offer } from '../../../types/offer';
import FavoritesItem from './favorite-item/favorite-item';

type FavoriteListProps = {
  offers: Offer[];
}

export default function FavoritesList({ offers }: FavoriteListProps) {
  const cityOffers: Record<string, Offer[]> = {};

  offers.forEach((offer) => {
    if (!cityOffers[offer.city.name]) {
      cityOffers[offer.city.name] = [offer];
    } else {
      cityOffers[offer.city.name].push(offer);
    }
  });

  const favoritesItems: JSX.Element[] = [];

  for (const city in cityOffers) {
    favoritesItems.push(<FavoritesItem key={city} city={city as CityName} offers={cityOffers[city]} />);
  }

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {favoritesItems}
      </ul>
    </section>
  );
}

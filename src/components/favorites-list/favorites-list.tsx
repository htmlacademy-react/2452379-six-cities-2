import { useAppSelector } from '../../hooks';
import { getOffers } from '../../store/slices/offers/offers.selectors';
import { CityName } from '../../types/city';
import { Offer } from '../../types/offer';
import FavoritesItem from './favorite-item/favorite-item';

export default function FavoritesList() {
  const offers = useAppSelector(getOffers);
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
    favoritesItems.push(<FavoritesItem key={city} city={city as CityName} offers={cityOffers[city]} />);
  }

  return (
    <ul className="favorites__list">
      {favoritesItems}
    </ul>
  );
}

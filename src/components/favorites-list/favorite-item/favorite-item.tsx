import { CityName } from '../../../types/city';
import { Offer } from '../../../types/offer';
import PlacesList from '../../places-list/places-list';

type FavoriteItemProps = {
  city: CityName;
  offers: Offer[];
}

export default function FavoritesItem({city, offers}: FavoriteItemProps) {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <PlacesList offers={offers} displayType='favorite'/>
    </li>
  );
}

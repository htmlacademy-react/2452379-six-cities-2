import { CityName } from '../../../types/city';
import { OfferSortType } from '../../../types/sort';

export type AppSlice = {
  city: CityName;
  sortType: OfferSortType;
}

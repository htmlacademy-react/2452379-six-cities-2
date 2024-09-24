import { NameSpace, offersSortTypes } from '../../const';
import { CityName } from '../../types/city';
import { Offer } from '../../types/offer';
import { OfferSortType } from '../../types/sort';
import { State } from '../../types/state';

type CitiesState = Pick<State, NameSpace.Cities>;

export const getCity = ({ CITIES }: CitiesState) => CITIES.city;
export const getSortedCityOffers = ({ offers, city, sortType }: { offers: Offer[]; city: CityName; sortType: OfferSortType }) => offers.filter((offer) => offer.city.name === city).sort(offersSortTypes[sortType]);

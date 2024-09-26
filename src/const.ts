import { CityName } from './types/city';
import { OfferType } from './types/offer';
import { OfferSort, OfferSortType } from './types/sort';

export const DEFAULT_CITY: CityName = 'Paris';
export const DEFAULT_SORT_TYPE: OfferSortType = 'none';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id'
}

export enum ApiRoute {
  Offers = '/offers',
  OfferById = '/offers/:offerId',
  OffersNearby = '/offers/:offerId/nearby',
  Reviews = '/comments/:offerId',
  Auth = '/login'
}

export enum ApiAction {
  getOffers = 'OFFERS/getOffers',
  getOffer = 'OFFERS/getOffer',
  getOffersNearby = 'OFFERS/getOffersNearby',
  getReviews = 'reviews/getReviews',
  fetchAuth = 'USER/fetchAuth',
  auth = 'USER/auth',
}

export enum CitiesAction {
  init = 'CITIES/init',
  getCityOffers = 'CITIES/getCityOffers',
  changeCity = 'CITIES/changeCity'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum NameSpace {
  User = 'USER',
  App = 'APP',
  Offers = 'OFFERS',
  Reviews = 'REVIEWS',
}

export const offerTypes: Record<OfferType, string> = {
  'apartment': 'Apartment',
  'hotel': 'Hotel',
  'room': 'Room',
  'house': 'House'
};

export const offersSortTypes: Record<OfferSortType, OfferSort> = {
  'none': () => 0,
  'priceAsc': (offerA, offerB) => +(offerA.price > offerB.price),
  'priceDesc': (offerA, offerB) => +(offerA.price < offerB.price),
  'topDesc': (offerA, offerB) => +(offerA.rating < offerB.rating)
};

export const AVAILABLE_LOCATIONS = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

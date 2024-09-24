import { OfferType } from './types/offer';
import { OfferSort, OfferSortType } from './types/sort';

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
  Reviews = '/comments/:offerId'
}

export enum ApiAction {
  getOffers = 'offers/getOffers',
  getOffer = 'offers/getOffer',
  getOffersNearby = 'offers/getOffersNearby',
  getReviews = 'reviews/getReviews'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum NameSpace {
  User = 'USER',
  Cities = 'CITIES',
  Offers = 'OFFERS',
  Reviews = 'REVIEWS'
}

export const offerTypes: Record<OfferType, string> = {
  'apartment': 'Apartment',
  'hotel': 'Hotel',
  'room': 'Room',
  'house': 'House'
};

export const offersSortTypes: Record<OfferSortType, OfferSort> = {
  'Popular': () => 0,
  'Price: low to high': (offerA, offerB) => +(offerA.price > offerB.price),
  'Price: high to low': (offerA, offerB) => +(offerA.price < offerB.price),
  'Top rated first': (offerA, offerB) => +(offerA.rating < offerB.rating)
};

export const AVAILABLE_LOCATIONS = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

import { OfferType } from './types/offer';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const offerTypes: Record<OfferType, string> = {
  'apartment': 'Apartment',
  'hotel': 'Hotel',
  'room': 'Room',
  'house': 'House'
};

export const AVAILABLE_LOCATIONS = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

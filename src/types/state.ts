import store from '../store';
import { CityName } from './city';
import { Offer, OfferFull } from './offer';
import { Review } from './review';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type CitiesProcess = {
  city: CityName;
};

export type ReviewsProcess = {
  reviews: Review[];
};

export type OffersProcess = {
  offers: Offer[];
  currentOffer: OfferFull | null;
  nearbyOffers: Offer[];
  isLoading: boolean;
};

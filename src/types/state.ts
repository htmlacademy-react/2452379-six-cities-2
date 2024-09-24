import store from '../store';
import { CityName } from './city';
import { Offer, OfferFull } from './offer';
import { Review } from './review';
import { OfferSortType } from './sort';

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
  activeOffer: OfferFull | Offer | null;
  nearbyOffers: Offer[];
  isLoading: boolean;
};

export type SortProcess = {
  type: OfferSortType;
};

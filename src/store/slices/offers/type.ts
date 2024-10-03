import { FetchStatus } from '../../../const';
import { Offer, OfferFull } from '../../../types/offer';

export type OffersSlice = {
  offers: Offer[];
  nearbyOffers: Offer[];
  favoriteOffers: Offer[];
  activeOffer: OfferFull | Offer | null;
  offersFetchStatus: FetchStatus;
  favoriteOffersFetchStatus: FetchStatus;
};

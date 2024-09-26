import { Offer, OfferFull } from '../../../types/offer';

export type OffersSlice = {
  offers: Offer[];
  activeOffer: OfferFull | Offer | null;
  nearbyOffers: Offer[];
  isLoading: boolean;
};

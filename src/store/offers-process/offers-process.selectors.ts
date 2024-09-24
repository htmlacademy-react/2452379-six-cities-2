import { NameSpace } from '../../const';
import { OfferLocation } from '../../types/offer';
import { State } from '../../types/state';

type OffersState = Pick<State, NameSpace.Offers>;

export const getOffers = ({OFFERS}: OffersState) => OFFERS.offers;
export const getActiveOfferLocation = ({OFFERS}: OffersState) => OFFERS.activeOffer as OfferLocation;
export const getActiveOffer = ({OFFERS}: OffersState) => OFFERS.activeOffer;
export const getNearbyOffers = ({OFFERS}: OffersState) => OFFERS.nearbyOffers;
export const getIsLoading = ({OFFERS}: OffersState) => OFFERS.isLoading;

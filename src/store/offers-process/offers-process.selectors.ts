import { NameSpace } from '../../const';
import { State } from '../../types/state';

type OffersState = Pick<State, NameSpace.Offers>;

export const getOffers = ({OFFERS}: OffersState) => OFFERS.offers;
export const getCurrentOffer = ({OFFERS}: OffersState) => OFFERS.currentOffer;
export const getNearbyOffers = ({OFFERS}: OffersState) => OFFERS.nearbyOffers;
export const getIsLoading = ({OFFERS}: OffersState) => OFFERS.isLoading;

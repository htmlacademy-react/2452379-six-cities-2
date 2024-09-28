import { State } from '../../type';
import { FetchStatus, NameSpace } from '../../../const';
import { OfferLocation } from '../../../types/offer';


type OffersState = Pick<State, NameSpace.Offers>;

export const getOffers = ({ OFFERS }: OffersState) => OFFERS.offers;
export const getActiveOffer = ({ OFFERS }: OffersState) => OFFERS.activeOffer;
export const getActiveOfferId = ({ OFFERS }: OffersState) => OFFERS.activeOffer?.id;
export const getActiveOfferLocation = ({ OFFERS }: OffersState) => OFFERS.activeOffer as OfferLocation;
export const getOffersNearby = ({ OFFERS }: OffersState) => OFFERS.nearbyOffers;
export const getOffersStatus = ({ OFFERS }: OffersState) => ({
  isLoading: OFFERS.fetchStatus === FetchStatus.Idle || OFFERS.fetchStatus === FetchStatus.Pending,
  isRejected: OFFERS.fetchStatus === FetchStatus.Rejected
});

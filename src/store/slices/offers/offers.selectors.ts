import { State } from '../../type';
import { FetchStatus, NameSpace } from '../../../const';
import { OfferLocation } from '../../../types/offer';


type OffersState = Pick<State, NameSpace.Offers>;

type OffersStateFetchStatuses = 'offers' | 'favoriteOffers';

export const getOffers = ({ OFFERS }: OffersState) => OFFERS.offers;
export const getActiveOffer = ({ OFFERS }: OffersState) => OFFERS.activeOffer;
export const getActiveOfferId = ({ OFFERS }: OffersState) => OFFERS.activeOffer?.id;
export const getActiveOfferLocation = ({ OFFERS }: OffersState) => OFFERS.activeOffer as OfferLocation;
export const getOffersNearby = ({ OFFERS }: OffersState) => OFFERS.nearbyOffers;
export const getFavoriteOffers = ({ OFFERS }: OffersState) => OFFERS.favoriteOffers;
export const getOffersStateFetchStatusOf = (prop: OffersStateFetchStatuses) => ({ OFFERS }: OffersState) => {
  const offers = OFFERS[prop];
  const fetchStatus = OFFERS[`${prop}FetchStatus` as keyof OffersState['OFFERS']];
  return {
    isLoading: fetchStatus === FetchStatus.Idle || fetchStatus === FetchStatus.Pending,
    isRejected: fetchStatus === FetchStatus.Rejected,
    isEmpty: fetchStatus === FetchStatus.Fullfilled && offers.length === 0
  };
};

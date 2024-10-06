import { State } from '../../type';
import { FetchStatus, NameSpace } from '../../../const';
import { OfferId } from '../../../types/offer';


type OffersState = Pick<State, NameSpace.Offers>;

type OffersStateFetchStatuses = 'offers' | 'favoriteOffers';

export const getOffers = ({ OFFERS }: OffersState) => OFFERS.offers;
export const getActiveOffer = ({ OFFERS }: OffersState) => OFFERS.activeOffer;
export const getActiveOfferId = ({ OFFERS }: OffersState) => OFFERS.activeOffer?.id;
export const getActiveOfferLocation = ({ OFFERS }: OffersState) => OFFERS.activeOffer?.location;
export const getOffersNearby = ({ OFFERS }: OffersState) => OFFERS.nearbyOffers;
export const getFavoriteOffers = ({ OFFERS }: OffersState) => OFFERS.favoriteOffers;
export const getIsLoadingOf = (prop: OffersStateFetchStatuses) => ({ OFFERS }: OffersState) => {
  const fetchStatus = OFFERS[`${prop}FetchStatus` as keyof OffersState['OFFERS']];
  return fetchStatus === FetchStatus.Idle || fetchStatus === FetchStatus.Pending;
};
export const getIsEmptyOf =
  (prop: OffersStateFetchStatuses) => ({ OFFERS }: OffersState) => OFFERS[prop].length === 0;

export const isOfferFavorite = (id: OfferId) => ({ OFFERS }: OffersState) => !!OFFERS.favoriteOffers.find(({ id: favoriteOfferId }) => favoriteOfferId === id);

import { describe, expect } from 'vitest';
import { FetchStatus, NameSpace } from '../../../const';
import { OffersSlice } from './type';
import { getActiveOffer, getActiveOfferId, getActiveOfferLocation, getFavoriteOffers, getFavoriteOffersFetchStatus, getIsEmptyOf, getIsLoadingOf, getOffers, getOffersFetchStatus, getOffersNearby, getOffersStateFetchStatusOf, isOfferFavorite } from './offers.selectors';
import { createFakeOffer, createFakeOffers } from '../../../utils/mocks';

describe('Offers Slice selectors', () => {
  const state = {
    [NameSpace.Offers]: {
      activeOffer: createFakeOffer(),
      offers: createFakeOffers(3),
      nearbyOffers: createFakeOffers(3),
      favoriteOffers: createFakeOffers(3),
      offersFetchStatus: FetchStatus.Idle,
      favoriteOffersFetchStatus: FetchStatus.Idle,
    } as OffersSlice
  };

  it('should return offers', () => {
    const { offers } = state[NameSpace.Offers];
    const result = getOffers(state);
    expect(result).toBe(offers);
  });

  it('should return active offer', () => {
    const { activeOffer } = state[NameSpace.Offers];
    const result = getActiveOffer(state);
    expect(result).toBe(activeOffer);
  });

  it('should return active offer id', () => {
    const { activeOffer } = state[NameSpace.Offers];
    const result = getActiveOfferId(state);
    expect(result).toBe(activeOffer?.id);
  });

  it('should return active offer location', () => {
    const { activeOffer } = state[NameSpace.Offers];
    const result = getActiveOfferLocation(state);
    expect(result).toEqual(activeOffer?.location);
  });

  it('should return nearby offers', () => {
    const { nearbyOffers } = state[NameSpace.Offers];
    const result = getOffersNearby(state);
    expect(result).toEqual(nearbyOffers);
  });

  it('should return favorite offers', () => {
    const { favoriteOffers } = state[NameSpace.Offers];
    const result = getFavoriteOffers(state);
    expect(result).toEqual(favoriteOffers);
  });

  it('should return offers isLoading', () => {
    const { offersFetchStatus } = state[NameSpace.Offers];
    const result = getIsLoadingOf('offers')(state);
    expect(result).toBe(offersFetchStatus === FetchStatus.Idle || FetchStatus.Pending);
  });

  it('should return offers isLoading', () => {
    const { offers } = state[NameSpace.Offers];
    const result = getIsEmptyOf('offers')(state);
    expect(result).toBe(offers.length === 0);
  });

  it('should return offer isFavorite', () => {
    const { id } = state[NameSpace.Offers].offers[0];
    const favoriteOffers = state[NameSpace.Offers].favoriteOffers;
    const result = isOfferFavorite(id)(state);
    expect(result).toBe(!!favoriteOffers.find(({ id: favId }) => favId === id));
  });
});

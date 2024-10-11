import { FetchStatus } from '../../../const';
import { Offer } from '../../../types/offer';
import { createFakeFullOffer, createFakeOffer, createFakeOffers } from '../../../utils/mocks';
import { offersSlice, setActiveOffer } from './offers.slice';
import { getFavoriteOffersThunk, getOffersNearbyThunk, getOffersThunk, getOfferThunk, postFavoriteOfferStatusThunk } from './offers.thunks';
import { OffersSlice } from './type';

describe('Offers Slice', () => {
  const initialState: OffersSlice = {
    offers: [],
    nearbyOffers: [],
    favoriteOffers: [],
    activeOffer: null,

    offersFetchStatus: FetchStatus.Idle,
    favoriteOffersFetchStatus: FetchStatus.Idle
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = offersSlice.reducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };

    const result = offersSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should set active offer with "setActiveOffer" action', () => {
    const offer = createFakeOffer();
    const action = setActiveOffer(offer);
    const expectedState: OffersSlice = {
      ...initialState,
      activeOffer: offer
    };

    const result = offersSlice.reducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  describe('getOffersThunk', () => {
    it('should set "offersFetchStatus" to "Pending" with pending action', () => {
      const action = getOffersThunk.pending;
      const expectedState: OffersSlice = {
        ...initialState,
        offersFetchStatus: FetchStatus.Pending
      };

      const result = offersSlice.reducer(initialState, action);
      expect(result).toEqual(expectedState);
    });

    it('should set "offersFetchStatus" to "Rejected" with rejected action', () => {
      const action = getOffersThunk.rejected;
      const expectedState: OffersSlice = {
        ...initialState,
        offersFetchStatus: FetchStatus.Rejected
      };

      const result = offersSlice.reducer(initialState, action);
      expect(result).toEqual(expectedState);
    });

    it('should set "offers" to array, "offersFetchStatus" to "Fullfilled" with fullfilled action', () => {
      const offers = createFakeOffers(3);
      const action = getOffersThunk.fulfilled(offers, '', undefined);
      const expectedState: OffersSlice = {
        ...initialState,
        offers,
        offersFetchStatus: FetchStatus.Fullfilled,
      };

      const result = offersSlice.reducer(initialState, action);
      expect(result).toEqual(expectedState);
    });
  });

  describe('getFavoriteOffersThunk', () => {
    it('should set "favoriteOffersFetchStatus" to "Pending" with pending action', () => {
      const action = getFavoriteOffersThunk.pending;
      const expectedState: OffersSlice = {
        ...initialState,
        favoriteOffersFetchStatus: FetchStatus.Pending
      };

      const result = offersSlice.reducer(initialState, action);
      expect(result).toEqual(expectedState);
    });

    it('should set "favoriteOffersFetchStatus" to "Rejected" with rejected action', () => {
      const action = getFavoriteOffersThunk.rejected;
      const expectedState: OffersSlice = {
        ...initialState,
        favoriteOffersFetchStatus: FetchStatus.Rejected
      };

      const result = offersSlice.reducer(initialState, action);
      expect(result).toEqual(expectedState);
    });

    it('should set "favoriteOffers" to array, "favoriteOffersFetchStatus" to "Fullfilled" with fullfilled action', () => {
      const offers = createFakeOffers(3);
      const action = getFavoriteOffersThunk.fulfilled(offers, '', undefined);
      const expectedState: OffersSlice = {
        ...initialState,
        favoriteOffers: offers,
        favoriteOffersFetchStatus: FetchStatus.Fullfilled,
      };

      const result = offersSlice.reducer(initialState, action);
      expect(result).toEqual(expectedState);
    });
  });

  it('should set "activeOffer" to offer with "getOfferThunk.fullfilled" action', () => {
    const offer = createFakeFullOffer();
    const action = getOfferThunk.fulfilled(offer, '', '');
    const expectedState: OffersSlice = {
      ...initialState,
      activeOffer: offer
    };

    const result = offersSlice.reducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  it('should set "offersNearby" to array with "getOffersNearbyThunk.fullfilled" action', () => {
    const offers = createFakeOffers(5);
    const action = getOffersNearbyThunk.fulfilled(offers, '', '');
    const expectedState: OffersSlice = {
      ...initialState,
      nearbyOffers: offers
    };

    const result = offersSlice.reducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  describe('postFavoriteOfferStatusThunk', () => {
    it('should push new favorite offer to "favoriteOffers", set "offersFetchStatus" to "Fullfilled" with fullfilled action', () => {
      const offer: Offer = { ...createFakeOffer(), isFavorite: true };
      const statusPayload = offer.isFavorite ? '0' : '1';
      const action = postFavoriteOfferStatusThunk.fulfilled(offer, '', { offerId: offer.id, status: statusPayload });
      const expectedState: OffersSlice = {
        ...initialState,
        favoriteOffers: [offer],
        offersFetchStatus: FetchStatus.Fullfilled
      };

      const result = offersSlice.reducer(initialState, action);
      expect(result).toEqual(expectedState);
    });

    it('should remove favorite offer from "favoriteOffers", set "offersFetchStatus" to "Fullfilled" with fullfilled action', () => {
      const offer: Offer = { ...createFakeOffer(), isFavorite: false };
      const statusPayload = offer.isFavorite ? '0' : '1';
      const favoriteOffers = createFakeOffers(3);
      const subInitialState = { ...initialState, favoriteOffers: [...favoriteOffers, offer] };
      const action = postFavoriteOfferStatusThunk.fulfilled(offer, '', { offerId: offer.id, status: statusPayload });
      const expectedState: OffersSlice = {
        ...subInitialState,
        favoriteOffers,
        offersFetchStatus: FetchStatus.Fullfilled
      };

      const result = offersSlice.reducer(subInitialState, action);
      expect(result).toEqual(expectedState);
    });

    it('should set "offersFetchStatus" to "Rejected" with rejected action', () => {
      const action = postFavoriteOfferStatusThunk.rejected;
      const expectedState: OffersSlice = {
        ...initialState,
        offersFetchStatus: FetchStatus.Rejected
      };

      const result = offersSlice.reducer(initialState, action);
      expect(result).toEqual(expectedState);
    });
  });
});

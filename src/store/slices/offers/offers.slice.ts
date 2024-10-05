import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFavoriteOffersThunk, getOffersNearbyThunk, getOffersThunk, getOfferThunk, postFavoriteOfferStatusThunk } from './offers.thunks';
import { OffersSlice } from './type';
import { FetchStatus, NameSpace } from '../../../const';
import { Offer } from '../../../types/offer';

const initialState: OffersSlice = {
  offers: [],
  nearbyOffers: [],
  favoriteOffers: [],
  activeOffer: null,

  offersFetchStatus: FetchStatus.Idle,
  favoriteOffersFetchStatus: FetchStatus.Idle
};

export const offersSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setActiveOffer: (state, action: PayloadAction<Offer | null>) => {
      state.activeOffer = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOffersThunk.pending, (state) => {
        state.offersFetchStatus = FetchStatus.Pending;
      })
      .addCase(getOffersThunk.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.offersFetchStatus = FetchStatus.Fullfilled;
      })
      .addCase(getOffersThunk.rejected, (state) => {
        state.offersFetchStatus = FetchStatus.Rejected;
      })
      .addCase(getOfferThunk.fulfilled, (state, action) => {
        state.activeOffer = action.payload;
      })
      .addCase(getOffersNearbyThunk.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(getFavoriteOffersThunk.pending, (state) => {
        state.favoriteOffersFetchStatus = FetchStatus.Pending;
      })
      .addCase(getFavoriteOffersThunk.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.favoriteOffersFetchStatus = FetchStatus.Fullfilled;
      })
      .addCase(getFavoriteOffersThunk.rejected, (state) => {
        state.favoriteOffersFetchStatus = FetchStatus.Rejected;
      })
      .addCase(postFavoriteOfferStatusThunk.fulfilled, (state, action) => {
        if (action.payload.isFavorite) {
          state.favoriteOffers.push(action.payload);
        } else {
          state.favoriteOffers = state.favoriteOffers.filter(({ id }) => id !== action.payload.id);
        }
        state.offersFetchStatus = FetchStatus.Fullfilled;
      })
      .addCase(postFavoriteOfferStatusThunk.rejected, (state) => {
        state.offersFetchStatus = FetchStatus.Rejected;
      });
  }
});

export const { setActiveOffer } = offersSlice.actions;

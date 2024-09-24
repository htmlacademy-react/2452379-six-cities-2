import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OffersProcess } from '../../types/state';
import { fetchOffersThunk, getNearbyOffersThunk, getOfferThunk } from '../api-actions';

const initialState: OffersProcess = {
  offers: [],
  currentOffer: null,
  nearbyOffers: [],

  isLoading: false
};

export const offersProcess = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOffersThunk.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoading = false;
      })
      .addCase(getOfferThunk.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
      })
      .addCase(getNearbyOffersThunk.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      });
  }
});

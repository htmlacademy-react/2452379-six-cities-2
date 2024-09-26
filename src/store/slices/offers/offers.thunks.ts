import { createAsyncThunk } from '@reduxjs/toolkit';
import { generatePath } from 'react-router-dom';
import { ApiAction, ApiRoute } from '../../../const';
import { Offer, OfferFull, OfferId } from '../../../types/offer';
import { AppDispatch, State, ThunksExtraArgument } from '../../type';

export const getOffersThunk =
  createAsyncThunk<
    Offer[],
    undefined,
    {
      dispatch: AppDispatch;
      state: State;
      extra: ThunksExtraArgument;
    }
  >(ApiAction.getOffers, async (_, { extra: { api } }) => {
    const { data } = await api.get<Offer[]>(ApiRoute.Offers);
    return data;
  });

export const getOfferThunk =
  createAsyncThunk<
    OfferFull,
    OfferId,
    {
      dispatch: AppDispatch;
      state: State;
      extra: ThunksExtraArgument;
    }
  >(ApiAction.getOffer, async (offerId, { extra: { api } }) => {
    const { data } = await api.get<OfferFull>(generatePath(ApiRoute.OfferById, { offerId }));
    return data;
  });

export const getNearbyOffersThunk =
  createAsyncThunk<
    Offer[],
    OfferId,
    {
      dispatch: AppDispatch;
      state: State;
      extra: ThunksExtraArgument;
    }
  >(ApiAction.getOffersNearby, async (offerId, { extra: { api } }) => {
    const { data } = await api.get<Offer[]>(generatePath(ApiRoute.OffersNearby, { offerId }));
    return data;
  });

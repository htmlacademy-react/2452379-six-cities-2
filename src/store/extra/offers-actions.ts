import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiAction, ApiRoute } from '../../const';
import { Offer, OfferFull, OfferId } from '../../types/offer';
import { AppDispatch, State } from '../../types/state';
import { AxiosInstance } from 'axios';
import { generatePath } from 'react-router-dom';
import { Review } from '../../types/review';

export const getOffersThunk =
  createAsyncThunk<
    Offer[],
    undefined,
    {
      dispatch: AppDispatch;
      state: State;
      extra: AxiosInstance;
    }
  >(ApiAction.getOffers, async (_, { extra: api }) => {
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
      extra: AxiosInstance;
    }
  >(ApiAction.getOffer, async (offerId, { extra: api }) => {
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
      extra: AxiosInstance;
    }
  >(ApiAction.getOffersNearby, async (offerId, { extra: api }) => {
    const { data } = await api.get<Offer[]>(generatePath(ApiRoute.OffersNearby, { offerId }));
    return data;
  });

export const getReviewsThunk =
  createAsyncThunk<
    Review[],
    OfferId,
    {
      dispatch: AppDispatch;
      state: State;
      extra: AxiosInstance;
    }
  >(ApiAction.getReviews, async (offerId, { extra: api }) => {
    const { data } = await api.get<Review[]>(generatePath(ApiRoute.Reviews, { offerId }));
    return data;
  });

import { createAsyncThunk } from '@reduxjs/toolkit';
import { generatePath } from 'react-router-dom';
import { ApiAction, ApiRoute, AppRoute } from '../../../const';
import { Offer, OfferFull, OfferId } from '../../../types/offer';
import { ThunksOptions } from '../../type';
import { StatusCodes } from 'http-status-codes';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { NotFoundError } from '../../../types/errors';

export const getOffersThunk =
  createAsyncThunk<
    Offer[],
    undefined,
    ThunksOptions
  >(ApiAction.getOffers, async (_, { extra: { api } }) => {
    try {
      const { data } = await api.get<Offer[]>(ApiRoute.Offers);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      }
      throw error;
    }
  });

export const getOfferThunk =
  createAsyncThunk<
    OfferFull,
    OfferId,
    ThunksOptions
  >(ApiAction.getOffer, async (offerId, { extra: { api, router } }) => {
    try {
      const { data } = await api.get<OfferFull>(generatePath(ApiRoute.OfferById, { offerId }));
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === StatusCodes.NOT_FOUND) {
          router.navigate(AppRoute.Unknown);
        } else {
          toast.error(error.message);
        }
      }
    }
  });

export const getOffersNearbyThunk =
  createAsyncThunk<
    Offer[],
    OfferId,
    ThunksOptions
  >(ApiAction.getOffersNearby, async (offerId, { extra: { api } }) => {
    try {
      const { data } = await api.get<Offer[]>(generatePath(ApiRoute.OffersNearby, { offerId }));
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === StatusCodes.NOT_FOUND) {
          toast.error((error.response.data as NotFoundError).message);
        }
        throw error;
      }
    }
  });

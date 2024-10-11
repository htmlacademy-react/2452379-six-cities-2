import { createAsyncThunk } from '@reduxjs/toolkit';
import { generatePath } from 'react-router-dom';
import { ApiAction, ApiRoute, AppRoute } from '../../../const';
import { FavoriteOfferStatus, Offer, OfferFull, OfferId } from '../../../types/offer';
import { ThunksOptions } from '../../type';
import { StatusCodes } from 'http-status-codes';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { AuthorizationError, ConflictError, NotFoundError, ValidationError } from '../../../types/errors';

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

export const getFavoriteOffersThunk =
  createAsyncThunk<
    Offer[],
    undefined,
    ThunksOptions
  >(ApiAction.getFavoriteOffers, async (_, { extra: { api } }) => {
    try {
      const { data } = await api.get<Offer[]>(ApiRoute.FavoriteOffers);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === StatusCodes.UNAUTHORIZED) {
          toast.error((error.response.data as AuthorizationError).message);
        } else {
          toast.error(error.message);
        }
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
      throw error;
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
        } else {
          toast.error(error.message);
        }
      }
      throw error;
    }
  });

export const postFavoriteOfferStatusThunk =
  createAsyncThunk<
    Offer,
    FavoriteOfferStatus,
    ThunksOptions
  >(ApiAction.postFavoriteOfferStatus, async ({ offerId, status }, { extra: { router, api } }) => {
    try {
      const { data } = await api.post<Offer>(generatePath(ApiRoute.FavoriteOfferStatus, { offerId, status: status }));
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case StatusCodes.NOT_FOUND:
            toast.error((error.response.data as NotFoundError).message);
            break;
          case StatusCodes.UNAUTHORIZED:
            router.navigate(AppRoute.LogIn);
            toast.error((error.response.data as AuthorizationError).message);
            break;
          case StatusCodes.BAD_REQUEST:
            toast.error((error.response.data as ValidationError).message);
            break;
          case StatusCodes.CONFLICT:
            toast.error((error.response.data as ConflictError).message);
            break;
          default:
            toast.error(error.message);
            break;
        }
      }
      throw error;
    }
  });

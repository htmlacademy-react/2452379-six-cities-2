import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunksOptions } from '../../type';
import { generatePath } from 'react-router-dom';
import { ApiAction, ApiRoute } from '../../../const';
import { OfferId } from '../../../types/offer';
import { Review, ReviewData } from '../../../types/review';
import { AxiosError } from 'axios';
import { AuthorizationError, NotFoundError, ValidationError } from '../../../types/errors';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';

export const getReviewsThunk =
  createAsyncThunk<
    Review[],
    OfferId,
    ThunksOptions
  >(ApiAction.getReviews, async (offerId, { extra: { api } }) => {
    try {
      const { data } = await api.get<Review[]>(generatePath(ApiRoute.Reviews, { offerId }));
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === StatusCodes.NOT_FOUND) {
          toast.error((error.response.data as NotFoundError).message);
        }
      }
      throw error;
    }
  });

export const postReviewThunk =
  createAsyncThunk<
    Review,
    ReviewData,
    ThunksOptions
  >(ApiAction.postReview, async ({ offerId, review }, { extra: { api } }) => {
    try {
      const { data } = await api.post<Review>(generatePath(ApiRoute.Reviews, { offerId }), review);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case StatusCodes.NOT_FOUND:
            toast.error((error.response.data as NotFoundError).message);
            break;
          case StatusCodes.UNAUTHORIZED:
            toast.error((error.response.data as AuthorizationError).message);
            break;
          case StatusCodes.BAD_REQUEST:
            toast.error((error.response.data as ValidationError).message);
            break;
        }
      }
      throw error;
    }
  });

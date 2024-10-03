import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserData, UserLogIn } from '../../../types/user';
import { ThunksOptions } from '../../type';
import { ApiAction, ApiRoute, AppRoute } from '../../../const';
import { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import { ValidationError } from '../../../types/errors';
import { getFavoriteOffersThunk } from '../offers/offers.thunks';
import { removeToken, saveToken } from '../../../services/token';

export const fetchAuthThunk = createAsyncThunk<
  UserData,
  undefined,
  ThunksOptions
>(ApiAction.fetchAuth, async (_, { dispatch, extra: { api, router } }) => {
  try {
    const { data } = await api.get<UserData>(ApiRoute.Auth);
    saveToken(data.token);

    if (router.state.location.pathname === AppRoute.Login) {
      router.navigate(AppRoute.Main);
    }

    dispatch(getFavoriteOffersThunk());

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status !== StatusCodes.UNAUTHORIZED) {
        toast.error(error.message);
      }
    }
    throw error;
  }
});

export const logInThunk = createAsyncThunk<
  UserData,
  UserLogIn,
  ThunksOptions
>(ApiAction.logIn, async (loginData, { dispatch, extra: { api, router } }) => {
  try {
    const { data } = await api.post<UserData>(ApiRoute.Auth, loginData);
    saveToken(data.token);

    router.navigate(AppRoute.Main);
    dispatch(getFavoriteOffersThunk());

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === StatusCodes.BAD_REQUEST) {
        toast.error((error.response.data as ValidationError).message);
      } else {
        toast.error(error.message);
      }
    }
    throw error;
  }
});

export const logOutThunk = createAsyncThunk<
  UserData,
  undefined,
  ThunksOptions
>(ApiAction.logOut, async (_, { extra: { api, router } }) => {
  removeToken();

  const { data } = await api.delete<UserData>(ApiRoute.Auth);
  router.navigate(AppRoute.Main);
  return data;
});

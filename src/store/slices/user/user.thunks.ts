import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserData, UserLogIn } from '../../../types/user';
import { AppDispatch, State, ThunksExtraArgument } from '../../type';
import { ApiAction, ApiRoute, AppRoute } from '../../../const';

export const fetchAuthThunk = createAsyncThunk<
  UserData,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: ThunksExtraArgument;
  }
>(ApiAction.fetchAuth, async (_, { extra: { api, router } }) => {
  const { data } = await api.get<UserData>(ApiRoute.Auth);
  if (router.state.location.pathname === AppRoute.Login) {
    router.navigate(AppRoute.Main);
  }
  return data;
});

export const logInThunk = createAsyncThunk<
  UserData,
  UserLogIn,
  {
    dispatch: AppDispatch;
    state: State;
    extra: ThunksExtraArgument;
  }
>(ApiAction.logIn, async (loginData, { extra: { api, router } }) => {
  const { data } = await api.post<UserData>(ApiRoute.Auth, loginData);
  router.navigate(AppRoute.Main);
  return data;
});

export const logOutThunk = createAsyncThunk<
  UserData,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: ThunksExtraArgument;
  }
>(ApiAction.logOut, async (_, { extra: { api, router } }) => {
  const { data } = await api.delete<UserData>(ApiRoute.Auth);
  router.navigate(AppRoute.Main);
  return data;
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserAuth } from '../../../types/user';
import { AppDispatch, State, ThunksExtraArgument } from '../../type';
import { ApiAction, ApiRoute } from '../../../const';

export const fetchAuth = createAsyncThunk<
  UserAuth,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: ThunksExtraArgument;
  }
>(ApiAction.fetchAuth, async (_, { extra: { api } }) => {
  const { data } = await api.get<UserAuth>(ApiRoute.Auth);
  return data;
});

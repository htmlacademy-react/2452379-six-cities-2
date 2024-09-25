import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiAction, ApiRoute } from '../../const';
import { AppDispatch, State } from '../../types/state';
import { AxiosInstance } from 'axios';
import { UserAuth } from '../../types/user';

export const tryAuth =
  createAsyncThunk<
    UserAuth,
    undefined,
    {
      dispatch: AppDispatch;
      state: State;
      extra: AxiosInstance;
    }
  >(ApiAction.auth, async (_, { extra: api }) => {
    const { data } = await api.get<UserAuth>(ApiRoute.Auth);
    return data;
  });

export const auth =
  createAsyncThunk<
    UserAuth,
    undefined,
    {
      dispatch: AppDispatch;
      state: State;
      extra: AxiosInstance;
    }
  >(ApiAction.auth, async (_, { extra: api }) => {
    const { data } = await api.get<UserAuth>(ApiRoute.Auth);
    return data;
  });

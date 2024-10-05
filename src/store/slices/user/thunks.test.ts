import { createApi } from '../../../services/api';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { State } from '../../type';
import { Action } from '@reduxjs/toolkit';
import { AppDispatch, extractActions } from '../../../utils/mocks';
import { ApiRoute, AppRoute } from '../../../const';
import { getFavoriteOffersThunk } from '../offers/offers.thunks';
import { generatePath } from 'react-router-dom';
import { router } from '../../../services/router';
import { fetchAuthThunk, logInThunk, logOutThunk } from './user.thunks';
import * as tokenStorage from '../../../services/token';

describe('User thunks', () => {
  const api = createApi();
  const mockApi = new MockAdapter(api);
  const storeCreator = configureMockStore<State, Action<string>, AppDispatch>([thunk.withExtraArgument({ api, router })]);
  let store: ReturnType<typeof storeCreator>;

  beforeEach(() => {
    store = storeCreator();
    router.navigate(AppRoute.Main);
  });

  describe('fetchAuthThunk', () => {
    it('should dispatch pending, fullfilled and getFavoriteOffersThunk', async () => {
      mockApi.onGet(generatePath(ApiRoute.Auth)).reply(200, { token: '' });

      await store.dispatch(fetchAuthThunk());

      const extractedActions = extractActions(store.getActions());
      expect(extractedActions).toEqual([
        fetchAuthThunk.pending.type,
        getFavoriteOffersThunk.pending.type,
        fetchAuthThunk.fulfilled.type
      ]);
    });

    it('should call saveToken once with received token', async () => {
      const responseBody = { token: 'secret' };
      mockApi.onGet(generatePath(ApiRoute.Auth)).reply(200, responseBody);

      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');
      await store.dispatch(fetchAuthThunk());

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(responseBody.token);
    });

    it('should navigate to "Main" if current page is "LogIn"', async () => {
      router.navigate(AppRoute.LogIn);
      mockApi.onGet(generatePath(ApiRoute.Auth)).reply(200, { token: '' });

      await store.dispatch(fetchAuthThunk());

      expect(router.state.location.pathname).toBe(AppRoute.Main);
    });

    it('should dispatch pending and rejected', async () => {
      mockApi.onGet(generatePath(ApiRoute.Auth)).reply(400);

      await store.dispatch(fetchAuthThunk());

      const extractedActions = extractActions(store.getActions());
      expect(extractedActions).toEqual([
        fetchAuthThunk.pending.type,
        fetchAuthThunk.rejected.type
      ]);
    });
  });

  describe('logInThunk', () => {
    it('should dispatch pending, fullfilled and getFavoriteOffersThunk', async () => {
      mockApi.onPost(generatePath(ApiRoute.Auth)).reply(200, {});

      await store.dispatch(logInThunk({ email: '', password: '' }));

      const extractedActions = extractActions(store.getActions());
      expect(extractedActions).toEqual([
        logInThunk.pending.type,
        getFavoriteOffersThunk.pending.type,
        logInThunk.fulfilled.type
      ]);
    });

    it('should call saveToken once with received token', async () => {
      const responseBody = { token: 'secret' };
      mockApi.onPost(generatePath(ApiRoute.Auth)).reply(200, responseBody);

      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');
      await store.dispatch(logInThunk({ email: '', password: '' }));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(responseBody.token);
    });

    it('should dispatch pending and rejected', async () => {
      mockApi.onPost(generatePath(ApiRoute.Auth)).reply(400);

      await store.dispatch(logInThunk({ email: '', password: '' }));

      const extractedActions = extractActions(store.getActions());
      expect(extractedActions).toEqual([
        logInThunk.pending.type,
        logInThunk.rejected.type
      ]);
    });
  });

  describe('logOutThunk', () => {
    it('should dispatch pending, fullfilled', async () => {
      mockApi.onDelete(generatePath(ApiRoute.Auth)).reply(200, {});

      await store.dispatch(logOutThunk());

      const extractedActions = extractActions(store.getActions());
      expect(extractedActions).toEqual([
        logOutThunk.pending.type,
        logOutThunk.fulfilled.type
      ]);
    });

    it('should call removeToken once', async () => {
      const responseBody = { token: 'secret' };

      const mockRemoveToken = vi.spyOn(tokenStorage, 'removeToken');
      await store.dispatch(logOutThunk());

      expect(mockRemoveToken).toBeCalledTimes(1);
    });

    it('should navigate to "Main"', async () => {
      router.navigate(AppRoute.LogIn);
      mockApi.onDelete(generatePath(ApiRoute.Auth)).reply(200);

      await store.dispatch(logOutThunk());

      expect(router.state.location.pathname).toBe(AppRoute.Main);
    });

    it('should dispatch pending and rejected', async () => {
      mockApi.onDelete(generatePath(ApiRoute.Auth)).reply(400);

      await store.dispatch(logOutThunk());

      const extractedActions = extractActions(store.getActions());
      expect(extractedActions).toEqual([
        logOutThunk.pending.type,
        logOutThunk.rejected.type
      ]);
    });
  });
});

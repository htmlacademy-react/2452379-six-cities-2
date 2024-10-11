import { createApi } from '../../../services/api';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { State } from '../../type';
import { Action } from '@reduxjs/toolkit';
import { AppDispatch, extractActions } from '../../../utils/mocks';
import { ApiRoute, AppRoute } from '../../../const';
import { getFavoriteOffersThunk, getOffersNearbyThunk, getOffersThunk, getOfferThunk, postFavoriteOfferStatusThunk } from './offers.thunks';
import { generatePath } from 'react-router-dom';
import { router } from '../../../services/router';
import { FavoriteOfferStatus } from '../../../types/offer';

describe('Offers thunks', () => {
  const api = createApi();
  const mockApi = new MockAdapter(api);
  const storeCreator = configureMockStore<State, Action<string>, AppDispatch>([thunk.withExtraArgument({ api, router })]);
  let store: ReturnType<typeof storeCreator>;

  beforeEach(() => {
    store = storeCreator();
    router.navigate(AppRoute.Main);
  });

  describe('getOffersThunk', () => {
    it('should dispatch pending and fullfilled', async () => {
      mockApi.onGet(ApiRoute.Offers).reply(200);

      await store.dispatch(getOffersThunk());

      const extractedActions = extractActions(store.getActions());
      expect(extractedActions).toEqual([
        getOffersThunk.pending.type,
        getOffersThunk.fulfilled.type
      ]);
    });

    it('should dispatch pending and rejected', async () => {
      mockApi.onGet(ApiRoute.Offers).reply(400);

      await store.dispatch(getOffersThunk());

      const extractedActions = extractActions(store.getActions());
      expect(extractedActions).toEqual([
        getOffersThunk.pending.type,
        getOffersThunk.rejected.type
      ]);
    });
  });

  describe('getFavoriteOffersThunk', () => {
    it('should dispatch pending and fullfilled', async () => {
      mockApi.onGet(ApiRoute.FavoriteOffers).reply(200);

      await store.dispatch(getFavoriteOffersThunk());

      const extractedActions = extractActions(store.getActions());
      expect(extractedActions).toEqual([
        getFavoriteOffersThunk.pending.type,
        getFavoriteOffersThunk.fulfilled.type
      ]);
    });

    it('should dispatch pending and rejected', async () => {
      mockApi.onGet(ApiRoute.FavoriteOffers).reply(400);

      await store.dispatch(getFavoriteOffersThunk());

      const extractedActions = extractActions(store.getActions());
      expect(extractedActions).toEqual([
        getFavoriteOffersThunk.pending.type,
        getFavoriteOffersThunk.rejected.type
      ]);
    });
  });

  describe('getOffersNearbyThunk', () => {
    it('should dispatch pending and fullfilled', async () => {
      const emptyId = '';
      mockApi.onGet(generatePath(ApiRoute.OffersNearby, { offerId: emptyId })).reply(200);

      await store.dispatch(getOffersNearbyThunk(''));

      const extractedActions = extractActions(store.getActions());
      expect(extractedActions).toEqual([
        getOffersNearbyThunk.pending.type,
        getOffersNearbyThunk.fulfilled.type
      ]);
    });

    it('should dispatch pending and rejected', async () => {
      const emptyId = '';
      mockApi.onGet(generatePath(ApiRoute.OffersNearby, { offerId: emptyId })).reply(400);

      await store.dispatch(getOffersNearbyThunk(''));

      const extractedActions = extractActions(store.getActions());
      expect(extractedActions).toEqual([
        getOffersNearbyThunk.pending.type,
        getOffersNearbyThunk.rejected.type
      ]);
    });

    it('should not navigate anywhere if rejected', async () => {
      const emptyId = '';
      mockApi.onGet(generatePath(ApiRoute.OffersNearby, { offerId: emptyId })).reply(404);
      const routeBefore = router.state.location.pathname;
      await store.dispatch(getOfferThunk(''));

      const extractedActions = extractActions(store.getActions());
      expect(extractedActions).toEqual([
        getOfferThunk.pending.type,
        getOfferThunk.rejected.type
      ]);
      expect(router.state.location.pathname).toBe(routeBefore);
    });
  });

  describe('getOfferThunk', () => {
    it('should dispatch pending and fullfilled', async () => {
      const emptyId = '';
      mockApi.onGet(generatePath(ApiRoute.OfferById, { offerId: emptyId })).reply(200);

      await store.dispatch(getOfferThunk(''));

      const extractedActions = extractActions(store.getActions());
      expect(extractedActions).toEqual([
        getOfferThunk.pending.type,
        getOfferThunk.fulfilled.type
      ]);
    });

    it('should dispatch pending and rejected', async () => {
      const emptyId = '';
      mockApi.onGet(generatePath(ApiRoute.OfferById, { offerId: emptyId })).reply(400);

      await store.dispatch(getOfferThunk(''));

      const extractedActions = extractActions(store.getActions());
      expect(extractedActions).toEqual([
        getOfferThunk.pending.type,
        getOfferThunk.rejected.type
      ]);
    });

    it('should navigate to "Unknown" if rejected and response status 404', async () => {
      const emptyId = '';
      mockApi.onGet(generatePath(ApiRoute.OfferById, { offerId: emptyId })).reply(404);

      await store.dispatch(getOfferThunk(''));

      const extractedActions = extractActions(store.getActions());
      expect(extractedActions).toEqual([
        getOfferThunk.pending.type,
        getOfferThunk.rejected.type
      ]);
      expect(router.state.location.pathname).toBe(AppRoute.Unknown);
    });
  });

  describe('postFavoriteOfferStatusThunk', () => {
    const favOfferStatus: FavoriteOfferStatus = { offerId: '', status: '0' };

    it('should dispatch pending and fullfilled', async () => {
      mockApi.onPost(generatePath(ApiRoute.FavoriteOfferStatus, favOfferStatus)).reply(200);

      await store.dispatch(postFavoriteOfferStatusThunk(favOfferStatus));

      const extractedActions = extractActions(store.getActions());
      expect(extractedActions).toEqual([
        postFavoriteOfferStatusThunk.pending.type,
        postFavoriteOfferStatusThunk.fulfilled.type
      ]);
    });

    it('should dispatch pending and rejected', async () => {
      mockApi.onPost(generatePath(ApiRoute.FavoriteOfferStatus, favOfferStatus)).reply(400);

      await store.dispatch(postFavoriteOfferStatusThunk(favOfferStatus));

      const extractedActions = extractActions(store.getActions());
      expect(extractedActions).toEqual([
        postFavoriteOfferStatusThunk.pending.type,
        postFavoriteOfferStatusThunk.rejected.type
      ]);
    });

    it('should navigate to "LogIn" if rejected and response status 401', async () => {
      mockApi.onPost(generatePath(ApiRoute.FavoriteOfferStatus, favOfferStatus)).reply(401);

      await store.dispatch(postFavoriteOfferStatusThunk(favOfferStatus));

      const extractedActions = extractActions(store.getActions());
      expect(extractedActions).toEqual([
        postFavoriteOfferStatusThunk.pending.type,
        postFavoriteOfferStatusThunk.rejected.type
      ]);
      expect(router.state.location.pathname).toBe(AppRoute.LogIn);
    });
  });

});

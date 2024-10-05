import { createApi } from '../../../services/api';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { State } from '../../type';
import { Action } from '@reduxjs/toolkit';
import { AppDispatch, extractActions } from '../../../utils/mocks';
import { ApiRoute } from '../../../const';
import { generatePath } from 'react-router-dom';
import { getReviewsThunk, postReviewThunk } from './reviews.thunks';

describe('Offers thunks', () => {
  const api = createApi();
  const mockApi = new MockAdapter(api);
  const storeCreator = configureMockStore<State, Action<string>, AppDispatch>([thunk.withExtraArgument({ api })]);
  let store: ReturnType<typeof storeCreator>;

  beforeEach(() => {
    store = storeCreator();
  });

  describe('getReviewsThunk', () => {
    it('should dispatch pending and fullfilled', async () => {
      mockApi.onGet(generatePath(ApiRoute.Reviews, { offerId: '' })).reply(200);

      await store.dispatch(getReviewsThunk(''));

      const extractedActions = extractActions(store.getActions());
      expect(extractedActions).toEqual([
        getReviewsThunk.pending.type,
        getReviewsThunk.fulfilled.type
      ]);
    });
    it('should dispatch pending and rejected', async () => {
      mockApi.onGet(generatePath(ApiRoute.Reviews, { offerId: '' })).reply(400);

      await store.dispatch(getReviewsThunk(''));

      const extractedActions = extractActions(store.getActions());
      expect(extractedActions).toEqual([
        getReviewsThunk.pending.type,
        getReviewsThunk.rejected.type
      ]);
    });
  });
  describe('postReviewThunk', () => {
    it('should dispatch pending and fullfilled', async () => {
      mockApi.onPost(generatePath(ApiRoute.Reviews, { offerId: '' })).reply(200);

      await store.dispatch(postReviewThunk({ offerId: '', review: { comment: '', rating: 0 } }));

      const extractedActions = extractActions(store.getActions());
      expect(extractedActions).toEqual([
        postReviewThunk.pending.type,
        postReviewThunk.fulfilled.type
      ]);
    });
    it('should dispatch pending and rejected', async () => {
      mockApi.onPost(generatePath(ApiRoute.Reviews, { offerId: '' })).reply(400);

      await store.dispatch(postReviewThunk({ offerId: '', review: { comment: '', rating: 0 } }));

      const extractedActions = extractActions(store.getActions());
      expect(extractedActions).toEqual([
        postReviewThunk.pending.type,
        postReviewThunk.rejected.type
      ]);
    });
  });
});

import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createApi } from '../services/api';
import { State } from '../store/type';
import { Action } from '@reduxjs/toolkit';
import { AppDispatch } from './mocks';
import { createRouter, router } from '../services/router';
import { BrowserRouter, RouteObject } from 'react-router-dom';
import { AppRoute } from '../const';

type ComponentWithMockStore = {
  component: JSX.Element;
  store: MockStore;
  api: MockAdapter;
}

export function withMockStore(component: JSX.Element, initialState: Partial<State> = {}): ComponentWithMockStore {
  const api = new MockAdapter(createApi());
  const storeCreator = configureMockStore<State, Action<string>, AppDispatch>([thunk.withExtraArgument({ api, router })]);
  const store = storeCreator(initialState);

  return ({
    component: (
      <Provider store={store}>
        {component}
      </Provider>
    ),
    store,
    api
  });
}

export function withRouter(component: JSX.Element): JSX.Element {
  return (
    <BrowserRouter basename="">
      {component}
    </BrowserRouter>
  );
}

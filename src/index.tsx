import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import store from './store';
import { getOffersThunk } from './store/extra/offers-actions';
import { tryAuth } from './store/extra/user-actions';

store.dispatch(getOffersThunk());
store.dispatch(tryAuth());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

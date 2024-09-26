import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import store from './store';
import { getOffersThunk } from './store/slices/offers/offers.thunks';
import { fetchAuthThunk } from './store/slices/user/user.thunks';

store.dispatch(getOffersThunk());
store.dispatch(fetchAuthThunk());

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

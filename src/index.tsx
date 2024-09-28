import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import store from './store';
import { getOffersThunk } from './store/slices/offers/offers.thunks';
import { fetchAuthThunk } from './store/slices/user/user.thunks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

store.dispatch(getOffersThunk());
store.dispatch(fetchAuthThunk());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>
);

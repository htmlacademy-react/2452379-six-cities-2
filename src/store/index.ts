import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { createApi } from '../services/api';
import { router } from '../services/router';

const api = createApi();

const store = configureStore({
  reducer: rootReducer,
  middleware:
    (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: { api, router }
        }
      })

});

export default store;

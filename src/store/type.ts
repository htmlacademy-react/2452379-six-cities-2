import { AxiosInstance } from 'axios';
import store from '.';
import { createBrowserRouter } from 'react-router-dom';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type ThunksExtraArgument = {
  api: AxiosInstance;
  router: ReturnType<typeof createBrowserRouter>;
}

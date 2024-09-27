import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { appSlice } from './slices/app/app.slice';
import { offersProcess } from './slices/offers/offers.slice';
import { reviewsProcess } from './slices/reviews/reviews.slice';
import { userProcess } from './slices/user/user.slice';


export const rootReducer = combineReducers({
  [NameSpace.App]: appSlice.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Offers]: offersProcess.reducer,
  [NameSpace.Reviews]: reviewsProcess.reducer,
});

import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { appSlice } from './slices/app/app.slice';
import { offersSlice } from './slices/offers/offers.slice';
import { reviewsSlice } from './slices/reviews/reviews.slice';
import { userSlice } from './slices/user/user.slice';


export const rootReducer = combineReducers({
  [NameSpace.App]: appSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Offers]: offersSlice.reducer,
  [NameSpace.Reviews]: reviewsSlice.reducer,
});

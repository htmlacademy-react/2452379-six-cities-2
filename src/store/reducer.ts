import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { citiesProcess } from './cities-process/cities-process.slice';
import { offersProcess } from './offers-process/offers-process.slice';
import { reviewsProcess } from './reviews-process/reviews-process.slice';


export const reducer = combineReducers({
  [NameSpace.Cities]: citiesProcess.reducer,
  [NameSpace.Offers]: offersProcess.reducer,
  [NameSpace.Reviews]: reviewsProcess.reducer
});

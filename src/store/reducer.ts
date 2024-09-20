import { createReducer } from '@reduxjs/toolkit';
import { changeCityAction } from './actions';
import { AVAILABLE_LOCATIONS } from '../const';
import { CityName } from '../types/city';
import offers from '../mocks/offers';

const initialState = {
  city: AVAILABLE_LOCATIONS[0] as CityName,
  offers: offers
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeCityAction, (state, action) => {
    state.city = action.payload;
  });
});

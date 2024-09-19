import { createReducer } from '@reduxjs/toolkit';
import { changeCityAction } from './actions';

const initialState = {
  city: 'Paris'
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeCityAction, (state, action) => {
    state.city = action.payload;
  });
});

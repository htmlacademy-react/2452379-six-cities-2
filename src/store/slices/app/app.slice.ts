import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfferSortType } from '../../../types/sort';
import { AppSlice } from './type';
import { DEFAULT_CITY, DEFAULT_SORT_TYPE, NameSpace } from '../../../const';
import { CityName } from '../../../types/city';

const initialState: AppSlice = {
  city: DEFAULT_CITY,
  sortType: DEFAULT_SORT_TYPE
};

export const appSlice = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<CityName>) => {
      state.city = action.payload;
    },
    changeSort: (state, action: PayloadAction<OfferSortType>) => {
      state.sortType = action.payload;
    }
  }
});

export const { changeCity, changeSort } = appSlice.actions;

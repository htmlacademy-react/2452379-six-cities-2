import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { CitiesProcess } from '../../types/state';
import { CityName } from '../../types/city';

const initialState: CitiesProcess = {
  city: 'Paris'
};

export const citiesProcess = createSlice({
  name: NameSpace.Cities,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<CityName>) => {
      state.city = action.payload;
    }
  }
});

export const { changeCity } = citiesProcess.actions;

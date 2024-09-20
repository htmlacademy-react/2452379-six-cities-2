import { createAction } from '@reduxjs/toolkit';
import { CityName } from '../types/city';

export const changeCityAction = createAction('cities/changeCity', (city: CityName) => ({ payload: city }));

import { createAction } from '@reduxjs/toolkit';

export const changeCityAction = createAction('cities/changeCity', (city: string) => ({ payload: city }));

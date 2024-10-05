import { DEFAULT_CITY, DEFAULT_SORT_TYPE } from '../../../const';
import { appSlice, changeCity, changeSort } from './app.slice';
import { AppSlice } from './type';

describe('App Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const initialState: AppSlice = {
      city: 'Paris',
      sortType: 'none'
    };

    const result = appSlice.reducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState: AppSlice = {
      city: DEFAULT_CITY,
      sortType: DEFAULT_SORT_TYPE
    };

    const result = appSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should change city with "changeCity" action', () => {
    const initialState: AppSlice = {
      city: 'Paris',
      sortType: 'none'
    };
    const action = changeCity('Amsterdam');
    const expectedState: AppSlice = {
      city: 'Amsterdam',
      sortType: 'none'
    };

    const result = appSlice.reducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  it('should change sortType with "changeSort" action', () => {
    const initialState: AppSlice = {
      city: 'Paris',
      sortType: 'none'
    };
    const action = changeSort('priceAsc');
    const expectedState: AppSlice = {
      city: 'Paris',
      sortType: 'priceAsc'
    };

    const result = appSlice.reducer(initialState, action);
    expect(result).toEqual(expectedState);
  });
});

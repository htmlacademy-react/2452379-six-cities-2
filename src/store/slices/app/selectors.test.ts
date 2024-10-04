import { describe, expect } from 'vitest';
import { NameSpace } from '../../../const';
import { AppSlice } from './type';
import { getCity, getSortType } from './app.selectors';

describe('App Slice selectors', () => {
  const state = {
    [NameSpace.App]: {
      city: 'Dusseldorf',
      sortType: 'none'
    } as AppSlice
  };

  it('should return city', () => {
    const { city } = state[NameSpace.App];
    const result = getCity(state);
    expect(result).toBe(city);
  });
  it('should return sortType', () => {
    const { sortType } = state[NameSpace.App];
    const result = getSortType(state);
    expect(result).toBe(sortType);
  });
});

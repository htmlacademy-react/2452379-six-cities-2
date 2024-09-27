import { createSelector } from '@reduxjs/toolkit';
import { NameSpace, offersSortTypes } from '../../../const';
import { State } from '../../type';
import { getOffers } from '../offers/offers.selectors';

type AppState = Pick<State, NameSpace.App>;

export const getCity = ({ APP }: AppState) => APP.city;
export const getSortType = ({ APP }: AppState) => APP.sortType;
export const getSortedCityOffers = createSelector(
  [getOffers, getCity, getSortType],
  (offers, city, sortType) =>
    offers.filter((offer) => offer.city.name === city).sort(offersSortTypes[sortType])
);

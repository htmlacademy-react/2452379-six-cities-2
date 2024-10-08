import { SORT_TYPES } from '../const';
import { Offer } from './offer';

export type OfferSortType = typeof SORT_TYPES[number];

export type OfferSort = (offerA: Offer, offerB: Offer) => number;

import { Offer } from './offer';

export type OfferSortType = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';

export type OfferSort = (offerA: Offer, offerB: Offer) => number;

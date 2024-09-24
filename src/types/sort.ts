import { Offer } from './offer';

export type OfferSortType = 'none' | 'priceAsc' | 'priceDesc' | 'topDesc';

export type OfferSort = (offerA: Offer, offerB: Offer) => number;

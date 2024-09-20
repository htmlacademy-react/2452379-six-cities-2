import { City } from './city';
import { MapData } from './common';

export type OfferType = 'room' | 'apartment' | 'hotel' | 'house';

export type OfferId = string;

export type Offer = {
  id: OfferId;
  title: string;
  type: OfferType;
  price: number;
  previewImage: string;
  city: City;
  location: MapData;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
};

export type OfferDetails = {
  host: {
    isPro: boolean;
    name: string;
    avatarUrl: string;
  };
  goods: string[];
  bedrooms: number;
  maxAdults: number;
  images: string[];
  description: string;
}

export type OfferFull = Omit<Offer, 'previewImage'> & OfferDetails;

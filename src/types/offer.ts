import { MapData } from './map';

type City = {
  name: string;
  location: MapData;
}

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
}

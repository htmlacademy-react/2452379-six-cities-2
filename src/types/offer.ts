type MapData = {
  latitude: number;
  longitude: number;
  zoom: number;
}

type City = {
  name: string;
  location: MapData;
}

export type OfferType = 'room' | 'apartment' | 'hotel' | 'house';

export type Offer = {
  id: string;
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

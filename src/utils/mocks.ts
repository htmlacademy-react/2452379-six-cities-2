import { Offer } from '../types/offer';
import { datatype, commerce, image, address, lorem, internet } from 'faker';
import { Review } from '../types/review';
import { User } from '../types/user';

export const createFakeUser = (): User => ({
  name: internet.userName(),
  avatarUrl: internet.avatar(),
  isPro: datatype.boolean()
});

export const createFakeOffer = (): Offer => ({
  id: datatype.uuid(),
  title: commerce.productName(),
  type: 'apartment',
  city: {
    name: 'Amsterdam',
    location: {
      latitude: +address.latitude(),
      longitude: +address.longitude(),
      zoom: 10
    }
  },
  price: datatype.float(),
  rating: datatype.float(),
  previewImage: image.dataUri(),
  location: {
    latitude: +address.latitude(),
    longitude: +address.longitude(),
    zoom: 12
  },
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean()
});

export const createFakeOffers = (length: number): Offer[] =>
  Array.from({ length }, createFakeOffer);

export const createFakeReview = (): Review => ({
  id: datatype.uuid(),
  comment: lorem.sentences(3),
  date: datatype.datetime().toISOString(),
  rating: datatype.number({ min: 0, max: 5 }),
  user: createFakeUser()
});

export const createFakeReviews = (length: number): Review[] =>
  Array.from({ length }, createFakeReview);

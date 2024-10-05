import { Offer, OfferFull } from '../types/offer';
import { datatype, commerce, image, address, lorem, internet } from 'faker';
import { Review } from '../types/review';
import { User, UserData } from '../types/user';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../store/type';
import { createApi } from '../services/api';

export type AppDispatch = ThunkDispatch<State, ReturnType<typeof createApi>, Action>;

export const extractActions = (actions: Action<string>[]) => actions.map((a) => a.type);

export const createFakeUser = (): User => ({
  name: internet.userName(),
  avatarUrl: internet.avatar(),
  isPro: datatype.boolean()
});

export const createFakeUserData = (): UserData => ({
  ...createFakeUser(),
  email: internet.email(),
  token: datatype.string(10)
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

export const createFakeFullOffer = (): OfferFull => ({
  ...createFakeOffer(),
  bedrooms: datatype.number(5),
  maxAdults: datatype.number(5),
  host: createFakeUser(),
  goods: lorem.words(5).split(' '),
  images: [image.dataUri(), image.dataUri()],
  description: lorem.sentences(5)
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

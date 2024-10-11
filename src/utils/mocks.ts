import { Offer, OfferFull } from '../types/offer';
import { datatype, commerce, image, address, lorem, internet } from 'faker';
import { Review } from '../types/review';
import { User, UserData } from '../types/user';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { State, ThunksExtraArgument } from '../store/type';
import { OffersSlice } from '../store/slices/offers/type';
import { AuthorizationStatus, DEFAULT_CITY, DEFAULT_SORT_TYPE, FetchStatus } from '../const';
import { AppSlice } from '../store/slices/app/type';
import { UserSlice } from '../store/slices/user/type';
import { ReviewsSlice } from '../store/slices/reviews/type';

export type AppDispatch = ThunkDispatch<State, ThunksExtraArgument, Action>;

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

export const createFakeOffer = (data?: Partial<Offer>): Offer => ({
  id: datatype.uuid(),
  title: commerce.productName(),
  type: 'apartment',
  city: {
    name: DEFAULT_CITY,
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
  isPremium: datatype.boolean(),
  ...data
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


export const createFakeOffersSlice = (data?: Partial<OffersSlice>): OffersSlice => ({
  offers: createFakeOffers(10),
  favoriteOffers: createFakeOffers(10),
  nearbyOffers: createFakeOffers(10),
  activeOffer: Math.random() ? createFakeFullOffer() : null,
  offersFetchStatus: FetchStatus.Idle,
  favoriteOffersFetchStatus: FetchStatus.Idle,
  ...data
});

export const createFakeAppSlice = (data?: Partial<AppSlice>): AppSlice => ({
  sortType: DEFAULT_SORT_TYPE,
  city: DEFAULT_CITY,
  ...data
});

export const createFakeUserSlice = (data?: Partial<UserSlice>): UserSlice => ({
  userData: createFakeUserData(),
  authStatus: AuthorizationStatus.Unknown,
  fetchStatus: FetchStatus.Idle,
  ...data
});

export const createFakeReviewsSlice = (data?: Partial<ReviewsSlice>): ReviewsSlice => ({
  reviews: createFakeReviews(10),
  postStatus: FetchStatus.Idle,
  ...data
});

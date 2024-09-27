import { OfferId } from './offer';
import { User } from './user';

export type Review = {
  id: string;
  comment: string;
  date: string;
  rating: number;
  user: User;
}

export type ReviewRaw = {
  comment: string;
  rating: number;
}

export type ReviewData = {
  offerId: OfferId;
  review: ReviewRaw;
}

import { FetchStatus } from '../../../const';
import { Review } from '../../../types/review';

export type ReviewsSlice = {
  reviews: Review[];
  postStatus: FetchStatus;
}

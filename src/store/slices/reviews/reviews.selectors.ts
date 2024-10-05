import { NameSpace } from '../../../const';
import { State } from '../../type';

type ReviewsState = Pick<State, NameSpace.Reviews>;

export const getReviews = ({ REVIEWS }: ReviewsState) => REVIEWS.reviews;
export const getRecentReviews = ({ REVIEWS }: ReviewsState) =>
  [...REVIEWS.reviews].sort(({ date: dateA }, { date: dateB }) =>
    +(new Date(dateA) < new Date(dateB))
  );
export const getReviewPostStatus = ({ REVIEWS }: ReviewsState) => REVIEWS.postStatus;

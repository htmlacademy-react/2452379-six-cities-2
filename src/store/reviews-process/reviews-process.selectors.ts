import { NameSpace } from '../../const';
import { State } from '../../types/state';

type ReviewsState = Pick<State, NameSpace.Reviews>;

export const getReviews = ({ REVIEWS }: ReviewsState) => REVIEWS.reviews;

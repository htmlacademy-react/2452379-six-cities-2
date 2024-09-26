import { NameSpace } from '../../../const';
import { State } from '../../type';

type ReviewsState = Pick<State, NameSpace.Reviews>;

export const getReviews = ({ REVIEWS }: ReviewsState) => REVIEWS.reviews;

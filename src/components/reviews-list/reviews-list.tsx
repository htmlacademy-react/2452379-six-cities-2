import { useAppSelector } from '../../hooks';
import { getRecentReviews } from '../../store/slices/reviews/reviews.selectors';
import { getIsAuthorized } from '../../store/slices/user/user.selectors';
import CommentForm from './comment-form/comment-form';
import ReviewItem from './review-item/review-item';

const MAX_REVIEWS_COUNT = 10;

export default function ReviewsList(): JSX.Element {
  const isAuthorized = useAppSelector(getIsAuthorized);
  const reviews = useAppSelector(getRecentReviews);

  return (
    <section className="offer__reviews reviews">
      {reviews.length > 0 &&
        (
          <>
            <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
            <ul className="reviews__list">
              {
                reviews.slice(0, MAX_REVIEWS_COUNT).map((review) => <ReviewItem key={review.id} review={review} />)
              }
            </ul>
          </>
        )}
      {isAuthorized && <CommentForm />}
    </section>
  );
}

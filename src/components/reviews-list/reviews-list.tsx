import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/slices/user/user.selectors';
import { Review } from '../../types/review';
import CommentForm from './comment-form/comment-form';
import ReviewItem from './review-item/review-item';

type ReviewsListProps = {
  reviews: Review[];
}

export default function ReviewsList({ reviews }: ReviewsListProps): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);

  return (
    <section className="offer__reviews reviews">
      {reviews.length > 0 &&
        (
          <>
            <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
            <ul className="reviews__list">
              {
                reviews.map((review) => <ReviewItem key={review.id} review={review} />)
              }
            </ul>
          </>
        )}
      {authStatus === AuthorizationStatus.Auth && <CommentForm />}
    </section>
  );
}

import { Review } from '../../types/review';
import StarsRating from '../stars-rating/stars-rating';

type ReviewItemProps = {
  review: Review;
}

const MONTHES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const humanizeDate = (date: string) => {
  const d = new Date(date);
  return `${MONTHES[d.getMonth()]} ${d.getFullYear()}`;
};

export default function ReviewItem({ review }: ReviewItemProps): JSX.Element {
  return (
    <li key={review.id} className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="Reviews avatar"></img>
        </div>
        <span className="reviews__user-name">
          {review.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <StarsRating className="reviews" rating={review.rating} />
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={review.date}>{humanizeDate(review.date)}</time>
      </div>
    </li>
  );
}

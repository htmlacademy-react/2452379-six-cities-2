import clsx from 'clsx';

type StarsRatingProps = {
  className: string;
  rating: number;
  showRatingValue?: boolean;
};

const MAX_RATING = 5;
const calcRating = (value: number) => `${Math.round(value) * 100 / MAX_RATING}%`;

export default function StarsRating({ className, rating, showRatingValue = false }: StarsRatingProps): JSX.Element {
  return (
    <div className={clsx('rating', `${className}__rating`)}>
      <div className={clsx('rating__stars', `${className}__stars`)}>
        <span style={{ width: calcRating(rating) }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {showRatingValue && <span className={clsx('rating__value', `${className}__rating-value`)}>{rating}</span>}
    </div>
  );
}

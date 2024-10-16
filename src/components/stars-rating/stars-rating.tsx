import clsx from 'clsx';

type StarsRatingProps = {
  className: string;
  rating: number;
  showRatingValue?: boolean;
};

const MAX_RATING = 5;
const calculateRating = (value: number) => `${Math.round(value) * 100 / MAX_RATING}%`;

export default function StarsRating({ className, rating, showRatingValue = false }: StarsRatingProps): JSX.Element {
  return (
    <div className={clsx('rating', `${className}__rating`)} data-testid="StarsRating">
      <div className={clsx('rating__stars', `${className}__stars`)}>
        <span style={{ width: calculateRating(rating) }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {showRatingValue && <span className={clsx('rating__value', `${className}__rating-value`)}>{rating}</span>}
    </div>
  );
}

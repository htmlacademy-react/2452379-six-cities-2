import { Fragment } from 'react';

const ratingTitles = [
  'terribly',
  'badly',
  'not bad',
  'good',
  'perfect'
];

type RatingInputProps = {
  rating: number;
  onInput: (rating: number) => void;
}

export default function RatingInput({ rating, onInput }: RatingInputProps): JSX.Element {
  return (
    <div className="reviews__rating-form form__rating">
      {
        ratingTitles.map((title, index) => (
          <Fragment key={title}>
            <input
              onChange={(evt) => onInput(+evt.target.value)}
              className="form__rating-input visually-hidden"
              name="rating" value={index + 1}
              id={`${index + 1}-stars`}
              type="radio"
              checked={index + 1 === rating}
            />
            <label htmlFor={`${index + 1}-stars`} className="reviews__rating-label form__rating-label" title={title}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        )).reverse()
      }
    </div>
  );
}

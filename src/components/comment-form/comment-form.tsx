import { ChangeEvent, useState } from 'react';

type FormData = {
  rating: number;
  review: string;
};

const initFormData: FormData = {
  rating: 0,
  review: ''
};

const ratingTitles: Record<string, string> = {
  '1': 'terribly',
  '2': 'badly',
  '3': 'not bad',
  '4': 'good',
  '5': 'perfect'
};

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;

export default function CommentForm() {
  const [formData, setFormData] = useState(initFormData);

  const handleInputChange = (evt: ChangeEvent) => {
    const { name, value } = evt.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  const isValid = formData.rating && formData.review.length >= MIN_COMMENT_LENGTH && formData.review.length <= MAX_COMMENT_LENGTH;

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          (() => {
            const result: JSX.Element[] = [];
            for (const key in ratingTitles) {
              result.push(
                <>
                  <input onChange={handleInputChange} className="form__rating-input visually-hidden" name="rating" value={key} id={`${key}-stars`} type="radio" />
                  <label htmlFor={`${key}-stars`} className="reviews__rating-label form__rating-label" title={ratingTitles[key]}>
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                  </label>
                </>
              );
            }
            return result.reverse();
          })()
        }
      </div>
      <textarea onChange={handleInputChange}className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={formData.review}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isValid}>Submit</button>
      </div>
    </form>
  );
}

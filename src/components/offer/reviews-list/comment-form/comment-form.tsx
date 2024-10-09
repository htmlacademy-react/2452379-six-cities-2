import { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { postReviewThunk } from '../../../../store/slices/reviews/reviews.thunks';
import { useParams } from 'react-router-dom';
import { ReviewRaw } from '../../../../types/review';
import RatingInput from './rating-input/rating-input';
import { getReviewPostStatus } from '../../../../store/slices/reviews/reviews.selectors';
import { FetchStatus } from '../../../../const';

type FormData = {
  rating: number;
  review: string;
};

const initFormData: FormData = {
  rating: 0,
  review: ''
};

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;

const createReview = (formData: FormData): ReviewRaw => (
  {
    rating: formData.rating,
    comment: formData.review
  }
);

export default function CommentForm() {
  const dispatch = useAppDispatch();
  const offerId = useParams().id;
  const postStatus = useAppSelector(getReviewPostStatus);
  const [formData, setFormData] = useState(initFormData);

  const isValid = formData.rating && formData.review.length >= MIN_COMMENT_LENGTH && formData.review.length <= MAX_COMMENT_LENGTH;

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (offerId && isValid) {
      dispatch(
        postReviewThunk(
          {
            offerId,
            review: createReview(formData)
          }
        ));
    }
  };

  useEffect(() => {
    if (postStatus === FetchStatus.Fullfilled) {
      setFormData(initFormData);
    }
  }, [postStatus]);

  return (
    <form onSubmit={handleSubmit} className="reviews__form form" action="#" method="post" data-testid="CommentForm">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <RatingInput rating={formData.rating} onInput={(rating) => setFormData({ ...formData, rating })} />
      <textarea
        onChange={(evt) => setFormData({ ...formData, review: evt.target.value })}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isValid || postStatus === FetchStatus.Pending}>Submit</button>
      </div>
    </form>
  );
}

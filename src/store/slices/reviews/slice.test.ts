import { FetchStatus } from '../../../const';
import { createFakeReview, createFakeReviews } from '../../../utils/mocks';
import { reviewsSlice } from './reviews.slice';
import { getReviewsThunk, postReviewThunk } from './reviews.thunks';
import { ReviewsSlice } from './type';

describe('Reviews Slice', () => {
  const initialState: ReviewsSlice = {
    reviews: [],
    postStatus: FetchStatus.Idle
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = reviewsSlice.reducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };

    const result = reviewsSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should set reviews to array with "getReviewsThunk.fullfilled" action', () => {
    const reviews = createFakeReviews(3);
    const action = getReviewsThunk.fulfilled(reviews, '', '');
    const expectedState: ReviewsSlice = {
      ...initialState,
      reviews
    };

    const result = reviewsSlice.reducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  describe('postReviewThunk', () => {
    it('should set "postStatus" to "Pending" with "postReviewThunk.pending" action', () => {
      const action = postReviewThunk.pending;
      const expectedState: ReviewsSlice = {
        ...initialState,
        postStatus: FetchStatus.Pending
      };

      const result = reviewsSlice.reducer(initialState, action);
      expect(result).toEqual(expectedState);
    });

    it('should set "postStatus" to "Rejected" with "postReviewThunk.rejected" action', () => {
      const action = postReviewThunk.rejected;
      const expectedState: ReviewsSlice = {
        ...initialState,
        postStatus: FetchStatus.Rejected
      };

      const result = reviewsSlice.reducer(initialState, action);
      expect(result).toEqual(expectedState);
    });

    it('should push new review to "reviews", set "postStatus" to "Fullfilled" with "postReviewThunk.fullfilled" action', () => {
      const review = createFakeReview();
      const action = postReviewThunk.fulfilled(review, '', { review, offerId: '' });
      const expectedState: ReviewsSlice = {
        postStatus: FetchStatus.Fullfilled,
        reviews: [review]
      };

      const result = reviewsSlice.reducer(initialState, action);
      expect(result).toEqual(expectedState);
    });
  });
});

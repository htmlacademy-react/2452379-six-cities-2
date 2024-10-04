import { describe, expect } from 'vitest';
import { FetchStatus, NameSpace } from '../../../const';
import { ReviewsSlice } from './type';
import { getRecentReviews, getReviewPostStatus, getReviews } from './reviews.selectors';
import { createFakeReviews } from '../../../utils/mocks';

describe('Reviews Slice selectors', () => {
  const state = {
    [NameSpace.Reviews]: {
      reviews: createFakeReviews(5),
      postStatus: FetchStatus.Idle
    } as ReviewsSlice
  };

  it('should return reviews', () => {
    const { reviews } = state[NameSpace.Reviews];
    const result = getReviews(state);
    expect(result).toEqual(reviews);
  });

  it('should return recent reviews', () => {
    const { reviews } = state[NameSpace.Reviews];
    const result = getRecentReviews(state);
    for (let i = 0; i < reviews.length; i++){
      expect(result).toContain(reviews[i]);
    }
  });

  it('should return review post status', () => {
    const { postStatus } = state[NameSpace.Reviews];
    const result = getReviewPostStatus(state);
    expect(result).toBe(postStatus);
  });
});

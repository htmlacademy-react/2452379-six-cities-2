import { render, screen } from '@testing-library/react';
import { State } from '../../../store/type';
import { AuthorizationStatus, NameSpace } from '../../../const';
import { createFakeReviewsSlice, createFakeUserSlice } from '../../../utils/mocks';
import { withMockStore } from '../../../utils/mock-components';
import ReviewsList from './reviews-list';

describe('Component: ReviewItem', () => {
  const reviewItemTestId = 'ReviewItem';
  const commentFormTestId = 'CommentForm';

  it('should render correctly when no reviews and unauthorised', () => {
    const testId = 'ReviewsList';
    const initialState: Pick<State, NameSpace.User | NameSpace.Reviews> = {
      USER: createFakeUserSlice({ authStatus: AuthorizationStatus.Unknown }),
      REVIEWS: createFakeReviewsSlice({ reviews: [] }),
    };
    const { component } = withMockStore(<ReviewsList />, initialState);
    render(component);

    expect(screen.getByTestId(testId)).toBeInTheDocument();
    expect(screen.queryByTestId(commentFormTestId)).not.toBeInTheDocument();
  });

  it('should render correctly when reviews and authorised', () => {
    const initialState: Pick<State, NameSpace.User | NameSpace.Reviews> = {
      USER: createFakeUserSlice({ authStatus: AuthorizationStatus.Auth }),
      REVIEWS: createFakeReviewsSlice(),
    };
    const { component } = withMockStore(<ReviewsList />, initialState);
    render(component);

    expect(screen.getAllByTestId(reviewItemTestId).length).toBe(initialState.REVIEWS.reviews.length);
    expect(screen.getByTestId(commentFormTestId)).toBeInTheDocument();
  });
});

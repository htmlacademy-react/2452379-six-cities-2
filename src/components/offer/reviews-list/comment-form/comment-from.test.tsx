import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentForm from './comment-form';
import { withMockStore } from '../../../../utils/mock-components';
import { createFakeReviewsSlice, extractActions } from '../../../../utils/mocks';
import { NameSpace } from '../../../../const';
import { State } from '../../../../store/type';
import { postReviewThunk } from '../../../../store/slices/reviews/reviews.thunks';
import { lorem } from 'faker';

describe('Component: CommentForm', () => {
  const testId = 'CommentForm';
  const ratingTestId = 'RatingInput';
  const ratingStarTestId = '1-stars';
  const initialState: Pick<State, NameSpace.Reviews> = {
    REVIEWS: createFakeReviewsSlice()
  };

  it('should render correctly', () => {
    const reviewText = 'Your review';
    const { component } = withMockStore(<CommentForm />, initialState);
    render(component);

    expect(screen.getByText(reviewText)).toBeInTheDocument();
    expect(screen.getByTestId(ratingTestId)).toBeInTheDocument();
  });

  it('should process review change correctly', async () => {
    const testText = 'test';
    const { component } = withMockStore(<CommentForm />, initialState);
    render(component);

    await userEvent.type(screen.getByRole('textbox'), testText);

    expect(screen.getByRole('textbox')).toHaveDisplayValue(testText);
  });

  it('should not let submit if not valid', async () => {
    const testText = 'test';
    const { component, store } = withMockStore(<CommentForm />, initialState);
    render(component);

    await userEvent.type(screen.getByRole('textbox'), testText);
    fireEvent.submit(screen.getByTestId(testId));

    const actions = extractActions(store.getActions());

    expect(actions).toEqual([]);
  });

  it('should let submit if valid', async () => {
    const testText = lorem.sentences(2);
    vi.mock('react-router-dom', async () => ({
      ...(await vi.importActual('react-router-dom')),
      useParams: () => ({ id: 'test' }),
    }));
    const { component, store } = withMockStore(<CommentForm />, initialState);

    render(component);
    await userEvent.click(screen.getByTestId(ratingStarTestId));
    await userEvent.type(screen.getByRole('textbox'), testText);
    fireEvent.submit(screen.getByTestId(testId));

    const actions = extractActions(store.getActions());

    expect(actions).toEqual([postReviewThunk.pending.type]);
  });
});

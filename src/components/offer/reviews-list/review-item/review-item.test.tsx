import { render, screen } from '@testing-library/react';
import { createFakeReview } from '../../../../utils/mocks';
import ReviewItem from './review-item';

describe('Component: ReviewItem', () => {
  it('should render correctly', () => {
    const review = createFakeReview();
    render(<ReviewItem review={review} />);

    expect(screen.getByText(review.user.name)).toBeInTheDocument();
    expect(screen.getByText(review.comment)).toBeInTheDocument();
  });
});

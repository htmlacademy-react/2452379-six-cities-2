import { render, screen } from '@testing-library/react';
import StarsRating from './stars-rating';

describe('Component: StarsRating', () => {
  it('should render correctly', () => {
    const testRating = 0;
    const ratingText = 'Rating';
    render(<StarsRating className='' rating={testRating} />);

    expect(screen.getByText(ratingText)).toBeInTheDocument();
  });

  it('should render correctly with rating value', () => {
    const testRating = 0;
    const ratingText = 'Rating';
    render(<StarsRating className='' rating={testRating} showRatingValue/>);

    expect(screen.getByText(ratingText)).toBeInTheDocument();
    expect(screen.getByText(testRating)).toBeInTheDocument();
  });
});

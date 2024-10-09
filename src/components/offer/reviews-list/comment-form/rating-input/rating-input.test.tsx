import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RatingInput from './rating-input';

describe('Component: RatingInput', () => {
  it('should render correctly', () => {
    const testId = 'RatingInput';
    const handleInput = (rating: number) => Math.pow(rating, 1);
    render(<RatingInput rating={0} onInput={handleInput} />);

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  it('should process rating input correctly', async () => {
    const testRating = 2;
    const testId = `${testRating}-stars`;
    const handleInputMock = vi.fn();
    render(<RatingInput rating={0} onInput={handleInputMock} />);

    await userEvent.click(screen.getByTestId(testId));

    expect(handleInputMock).toBeCalledTimes(1);
    expect(handleInputMock).toBeCalledWith(testRating);
  });
});

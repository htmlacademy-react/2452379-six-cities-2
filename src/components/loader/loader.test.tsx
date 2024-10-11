import { render, screen } from '@testing-library/react';
import Loader, { LoaderProps } from './loader';

describe('Component: Loader', () => {
  it('should render correctly', () => {
    const testId = 'Loader';
    const initialProps: LoaderProps = {
      mainColor: '#4d81af',
      secondaryColor: '#f0f0f0',
      speed: 100,
      still: false,
      thickness: 100
    };

    render(<Loader {...initialProps} />);

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});

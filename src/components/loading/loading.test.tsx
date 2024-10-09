import { render, screen } from '@testing-library/react';
import Loading, { LoadingProps } from './loading';

describe('Component: Loading', () => {
  it('should render correctly', () => {
    const testId = 'Loader';
    const initialProps: LoadingProps = {
      mainColor: '#4d81af',
      secondaryColor: '#f0f0f0',
      speed: 100,
      still: false,
      thickness: 100
    };

    render(<Loading {...initialProps} />);

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});

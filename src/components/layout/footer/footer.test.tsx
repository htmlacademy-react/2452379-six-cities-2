import { render, screen } from '@testing-library/react';
import Footer from './footer';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const testId = 'Footer';
    render(<Footer />);
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});

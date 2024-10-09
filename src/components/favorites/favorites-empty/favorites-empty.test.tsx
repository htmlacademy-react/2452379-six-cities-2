import { screen, render } from '@testing-library/react';
import FavoritesEmpty from './favorites-empty';

describe('Component: FavoritesEmpty', () => {
  it('should render correctly', () => {
    const nothingSavedText = 'Nothing yet saved.';
    render(<FavoritesEmpty />);
    expect(screen.getByText(nothingSavedText)).toBeInTheDocument();
  });
});

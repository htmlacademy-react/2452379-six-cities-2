import { render, screen } from '@testing-library/react';
import { withMockStore } from '../../../utils/mock-components';
import FavoritesList from './favorites-list';

describe('Component: FavoritesList', () => {
  it('should render correctly', () => {
    const savedListingText = 'Saved listing';
    const { component } = withMockStore(<FavoritesList offers={[]}/>);
    render(component);
    expect(screen.getByText(savedListingText)).toBeInTheDocument();
  });
});

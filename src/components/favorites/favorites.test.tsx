import { render, screen } from '@testing-library/react';
import { NameSpace } from '../../const';
import { State } from '../../store/type';
import { withMockStore, withRouter } from '../../utils/mock-components';
import { createFakeAppSlice, createFakeOffersSlice, createFakeUserSlice } from '../../utils/mocks';
import Favorites from './favorites';

describe('Component: Favorites', () => {
  const testIds = {
    favoritesEmpty: 'FavoritesEmpty',
    favoritesPlaces: 'FavoritesContainer'
  };

  it('should render correctly when no favorites', () => {
    render(<Favorites offers={[]} />);
    expect(screen.getByTestId(testIds.favoritesEmpty)).toBeInTheDocument();
  });

  it('should render correctly when favorites', () => {
    const initialState: Omit<State, NameSpace.Reviews> = {
      OFFERS: createFakeOffersSlice(),
      APP: createFakeAppSlice(),
      USER: createFakeUserSlice()
    };
    const { component } = withMockStore(withRouter(<Favorites offers={initialState.OFFERS.offers} />), initialState);

    render(component);
    expect(screen.getByTestId(testIds.favoritesPlaces)).toBeInTheDocument();
  });
});


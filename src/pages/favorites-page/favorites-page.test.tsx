import { render, screen } from '@testing-library/react';
import { withMockStore, withRouter } from '../../utils/mock-components';
import { FetchStatus, NameSpace } from '../../const';
import { createFakeOffersSlice, createFakeAppSlice, createFakeUserSlice } from '../../utils/mocks';
import { State } from '../../store/type';
import FavoritesPage from './favorites-page';

describe('Component: FavoritesPage', () => {
  const loaderTestId = 'Loader';
  const favoritesTestId = 'Favorites';
  const initialState: Pick<State, NameSpace.Offers | NameSpace.User | NameSpace.App> = {
    OFFERS: createFakeOffersSlice(),
    USER: createFakeUserSlice(),
    APP: createFakeAppSlice()
  };

  it('should render loader when loading favorites', () => {
    const { component } = withMockStore(withRouter(<FavoritesPage />), initialState);

    render(component);

    expect(screen.getByTestId(loaderTestId)).toBeInTheDocument();
  });

  it('should render "Favorites" when favorites loaded', () => {
    const { component } = withMockStore(withRouter(<FavoritesPage />), { ...initialState, OFFERS: createFakeOffersSlice({ favoriteOffersFetchStatus: FetchStatus.Fullfilled }) });

    render(component);

    expect(screen.getByTestId(favoritesTestId)).toBeInTheDocument();
  });
});

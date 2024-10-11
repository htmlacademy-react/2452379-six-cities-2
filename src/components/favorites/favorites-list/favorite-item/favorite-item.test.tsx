import { render, screen } from '@testing-library/react';
import FavoriteItem from './favorite-item';
import { createFakeAppSlice, createFakeOffers, createFakeOffersSlice, createFakeUserSlice } from '../../../../utils/mocks';
import { CityName } from '../../../../types/city';
import { withMockStore, withRouter } from '../../../../utils/mock-components';
import { State } from '../../../../store/type';
import { NameSpace } from '../../../../const';

describe('Component: FavoriteItem', () => {
  it('should render correctly', () => {
    const placesListTestId = 'PlacesList';
    const initialState: Omit<State, NameSpace.Reviews> = {
      OFFERS: createFakeOffersSlice(),
      APP: createFakeAppSlice(),
      USER: createFakeUserSlice()
    };
    const city: CityName = 'Paris';
    const { component } = withMockStore(withRouter(<FavoriteItem offers={createFakeOffers(3)} city={city} />), initialState);
    render(component);

    expect(screen.getByText(city)).toBeInTheDocument();
    expect(screen.getByTestId(placesListTestId)).toBeInTheDocument();
  });
});

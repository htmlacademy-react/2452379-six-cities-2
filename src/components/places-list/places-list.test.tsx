import { render, screen } from '@testing-library/react';
import { createFakeAppSlice, createFakeOffersSlice, createFakeUserSlice } from '../../utils/mocks';
import { NameSpace } from '../../const';
import { State } from '../../store/type';
import { withMockStore, withRouter } from '../../utils/mock-components';
import PlacesList from './places-list';

describe('Component: PlacesList', () => {
  const initialState: Omit<State, NameSpace.Reviews> = {
    APP: createFakeAppSlice(),
    USER: createFakeUserSlice(),
    OFFERS: createFakeOffersSlice()
  };
  const placeCardTestId = 'PlaceCard';

  it('should render correctly', () => {
    const { component } = withMockStore(withRouter(<PlacesList offers={initialState.OFFERS.offers} displayType='main' />), initialState);
    render(component);

    expect(screen.getAllByTestId(placeCardTestId).length).toBe(initialState.OFFERS.offers.length);
  });
});

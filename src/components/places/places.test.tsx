import { render, screen } from '@testing-library/react';
import { createFakeAppSlice, createFakeOffersSlice, createFakeUserSlice } from '../../utils/mocks';
import { State } from '../../store/type';
import { NameSpace } from '../../const';
import Places from './places';
import { withMockStore, withRouter } from '../../utils/mock-components';

describe('Component: Places', () => {
  const initialState: Omit<State, NameSpace.Reviews> = {
    APP: createFakeAppSlice(),
    USER: createFakeUserSlice(),
    OFFERS: createFakeOffersSlice()
  };
  const sortFormTestId = 'PlacesSortForm';
  const placesListTestId = 'PlacesList';

  it('should render correctly', () => {
    const { component } = withMockStore(withRouter(<Places offers={initialState.OFFERS.offers} />), initialState);
    render(component);

    expect(screen.getByTestId(sortFormTestId)).toBeInTheDocument();
    expect(screen.getByTestId(placesListTestId)).toBeInTheDocument();
  });
});

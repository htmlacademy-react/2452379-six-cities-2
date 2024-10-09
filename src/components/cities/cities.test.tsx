import { render, screen } from '@testing-library/react';
import { NameSpace } from '../../const';
import { State } from '../../store/type';
import { withMockStore, withRouter } from '../../utils/mock-components';
import Cities from './cities';
import { createFakeAppSlice, createFakeOffersSlice, createFakeUserSlice } from '../../utils/mocks';

describe('Component: Cities', () => {
  const testIds = {
    citiesEmpty: 'CitiesEmpty',
    citiesPlaces: 'CitiesPlacesContainer'
  };

  it('should render correctly when no offers', () => {
    const initialState: Pick<State, NameSpace.App | NameSpace.Offers> = {
      OFFERS: createFakeOffersSlice({ offers: [] }),
      APP: createFakeAppSlice()
    };
    const { component } = withMockStore(<Cities />, initialState);

    render(component);
    expect(screen.getByTestId(testIds.citiesEmpty)).toBeInTheDocument();
  });

  it('should render correctly when offers', () => {
    const initialState: Omit<State, NameSpace.Reviews> = {
      OFFERS: createFakeOffersSlice(),
      APP: createFakeAppSlice(),
      USER: createFakeUserSlice()
    };
    const { component } = withMockStore(withRouter(<Cities />), initialState);

    render(component);
    expect(screen.getByTestId(testIds.citiesPlaces)).toBeInTheDocument();
  });
});


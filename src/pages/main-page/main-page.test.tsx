import { render, screen } from '@testing-library/react';
import { withMockStore, withRouter } from '../../utils/mock-components';
import MainPage from './main-page';
import { FetchStatus, NameSpace } from '../../const';
import { createFakeOffersSlice, createFakeAppSlice, createFakeUserSlice } from '../../utils/mocks';
import { State } from '../../store/type';

describe('Component: MainPage', () => {
  const loaderTestId = 'Loader';
  const citiesTestId = 'Cities';
  const initialState: Pick<State, NameSpace.Offers | NameSpace.User | NameSpace.App> = {
    OFFERS: createFakeOffersSlice(),
    USER: createFakeUserSlice(),
    APP: createFakeAppSlice()
  };

  it('should render loader when loading offers', () => {
    const { component } = withMockStore(withRouter(<MainPage />), initialState);

    render(component);

    expect(screen.getByTestId(loaderTestId)).toBeInTheDocument();
  });

  it('should render "Cities" when offers loaded', () => {
    const { component } = withMockStore(withRouter(<MainPage />), { ...initialState, OFFERS: createFakeOffersSlice({ offersFetchStatus: FetchStatus.Fullfilled }) });

    render(component);

    expect(screen.getByTestId(citiesTestId)).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import User from './user';
import { createFakeOffersSlice, createFakeUserSlice } from '../../../../../utils/mocks';
import { State } from '../../../../../store/type';
import { withMockStore, withRouter } from '../../../../../utils/mock-components';
import { FetchStatus, NameSpace } from '../../../../../const';
import { UserData } from '../../../../../types/user';

describe('Component: User', () => {
  it('should render correctly when loading', () => {
    const initialState: Pick<State, NameSpace.Offers | NameSpace.User> = {
      OFFERS: createFakeOffersSlice({ favoriteOffersFetchStatus: FetchStatus.Pending }),
      USER: createFakeUserSlice()
    };
    const loadingText = '...';
    const { component } = withMockStore(withRouter(<User />), initialState);

    render(component);

    expect(screen.getByText((initialState.USER.userData as UserData).email)).toBeInTheDocument();
    expect(screen.getByText(loadingText)).toBeInTheDocument();
  });
  it('should render correctly when loaded', () => {
    const initialState: Pick<State, NameSpace.Offers | NameSpace.User> = {
      OFFERS: createFakeOffersSlice({ favoriteOffersFetchStatus: FetchStatus.Fullfilled }),
      USER: createFakeUserSlice()
    };
    const { component } = withMockStore(withRouter(<User />), initialState);

    render(component);

    expect(screen.getByText((initialState.USER.userData as UserData).email)).toBeInTheDocument();
    expect(screen.getByText(initialState.OFFERS.favoriteOffers.length)).toBeInTheDocument();
  });
});

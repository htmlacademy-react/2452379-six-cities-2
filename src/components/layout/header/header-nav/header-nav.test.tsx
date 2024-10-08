import { render, screen } from '@testing-library/react';
import { AuthorizationStatus, NameSpace } from '../../../../const';
import { State } from '../../../../store/type';
import { withMockStore, withRouter } from '../../../../utils/mock-components';
import { createFakeOffersSlice, createFakeUserSlice } from '../../../../utils/mocks';
import HeaderNav from './header-nav';

describe('Component: HeaderNav', () => {
  it('should render correctly when unauthorized', () => {
    const signInText = 'Sign in';
    const initialState: Pick<State, NameSpace.User> = { USER: createFakeUserSlice() };
    const { component } = withMockStore(withRouter(<HeaderNav />), initialState);

    render(component);

    expect(screen.getByText(signInText)).toBeInTheDocument();
  });

  it('should render correctly when authorized', () => {
    const signOutText = 'Sign out';
    const initialState: Pick<State, NameSpace.User | NameSpace.Offers> = {
      OFFERS: createFakeOffersSlice(),
      USER: createFakeUserSlice({ authStatus: AuthorizationStatus.Auth })
    };
    const { component } = withMockStore(withRouter(<HeaderNav />), initialState);

    render(component);

    expect(screen.getByText(signOutText)).toBeInTheDocument();
  });
});

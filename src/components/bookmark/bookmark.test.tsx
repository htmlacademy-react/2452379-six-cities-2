import { screen, render } from '@testing-library/react';
import { withMockStore } from '../../utils/mock-components';
import { State } from '../../store/type';
import { AuthorizationStatus, FetchStatus, NameSpace } from '../../const';
import { createFakeOffer, createFakeOffersSlice, createFakeUserData } from '../../utils/mocks';
import Bookmark from './bookmark';
import { getIsAuthorized } from '../../store/slices/user/user.selectors';
import { isOfferFavorite } from '../../store/slices/offers/offers.selectors';

describe('Component: Bookmark', () => {
  const className = '';
  const testId = 'button';
  const activeCityClass = `${className}__bookmark-button--active`;
  const initialState: Pick<State, NameSpace.User | NameSpace.Offers> = {
    OFFERS: createFakeOffersSlice(),
    USER: { userData: createFakeUserData(), authStatus: AuthorizationStatus.Unknown, fetchStatus: FetchStatus.Idle }
  };


  it('should render correctly when unauthorized', () => {
    const offerId = '';
    const { component, store } = withMockStore(<Bookmark offerId={offerId} className={className} />, initialState);
    const state = store.getState() as State;
    render(component);

    const expectedText = (getIsAuthorized(state) && isOfferFavorite(offerId)(state) ? 'In' : 'To').concat(' bookmarks');
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(testId)).not.toHaveClass(activeCityClass);
  });

  it('should render correctly when authorized and not bookmarked', () => {
    const offerId = 'test';
    const subInitialState: Pick<State, NameSpace.User | NameSpace.Offers> = {
      ...initialState,
      USER: { userData: createFakeUserData(), authStatus: AuthorizationStatus.Auth, fetchStatus: FetchStatus.Idle }
    };

    const { component } = withMockStore(<Bookmark offerId={offerId} className={className} />, subInitialState);
    render(component);

    const expectedText = 'To bookmarks';
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(testId)).not.toHaveClass(activeCityClass);
  });

  it('should render correctly when authorized and bookmarked', () => {
    const offerId = 'test';
    const subInitialState: Pick<State, NameSpace.User | NameSpace.Offers> = {
      ...initialState,
      USER: { ...initialState.USER, authStatus: AuthorizationStatus.Auth }
    };
    subInitialState.OFFERS.favoriteOffers.push(createFakeOffer({ id: offerId, isFavorite: true }));

    const { component } = withMockStore(<Bookmark offerId={offerId} className={className} />, subInitialState);
    render(component);

    const expectedText = 'In bookmarks';
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(testId)).toHaveClass(activeCityClass);
  });
});

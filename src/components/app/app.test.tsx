import { render, screen } from '@testing-library/react';
import { AppRoute, AuthorizationStatus, FetchStatus } from '../../const';
import { router } from '../../services/router';
import App from './app';
import { withMockStore } from '../../utils/mock-components';
import { State } from '../../store/type';
import { createFakeOffersSlice, createFakeAppSlice, createFakeUserSlice, createFakeReviewsSlice } from '../../utils/mocks';
import { generatePath } from 'react-router-dom';

describe('Component: App', () => {
  const initialState: State = {
    OFFERS: createFakeOffersSlice({ offersFetchStatus: FetchStatus.Fullfilled, favoriteOffersFetchStatus: FetchStatus.Fullfilled }),
    APP: createFakeAppSlice(),
    USER: createFakeUserSlice({ authStatus: AuthorizationStatus.Auth, fetchStatus: FetchStatus.Fullfilled }),
    REVIEWS: createFakeReviewsSlice()
  };
  const pageTestIds = {
    mainPage: 'MainPage',
    favoritesPage: 'Favorites',
    logInPage: 'LogInPage',
    logOutPage: 'MainPage',
    unknownPage: 'UnknownPage',
    offerPage: 'OfferPage',
  };
  const { component } = withMockStore(<App />, initialState);

  it('should render MainPage when user navigate to "/"', () => {
    router.navigate(AppRoute.Main);
    render(component);
    expect(screen.getByTestId(pageTestIds.mainPage)).toBeInTheDocument();
  });

  it('should render FavoritesPage when user navigate to "/favorites"', () => {
    router.navigate(AppRoute.Favorites);
    render(component);
    expect(screen.getByText(initialState.OFFERS.favoriteOffers[0].title)).toBeInTheDocument();
  });

  it('should render LogInPage when user navigate to "/login"', () => {
    router.navigate(AppRoute.LogIn);
    render(component);
    expect(screen.getByTestId(pageTestIds.logInPage)).toBeInTheDocument();
  });

  it('should render MainPage when user navigate to "/logout"', () => {
    router.navigate(AppRoute.LogOut);
    render(component);
    expect(screen.getByTestId(pageTestIds.logOutPage)).toBeInTheDocument();
  });

  it('should render OfferPage when user navigate to "/offer/:id"', () => {
    router.navigate(generatePath(AppRoute.Offer, { id: 'test' }));
    render(component);
    expect(screen.getByTestId(pageTestIds.offerPage)).toBeInTheDocument();
  });

  it('should render UnknownPage when user navigate to "sfnjsahfjkwahefiubhaeripugvhjeuiregnuisdfrghusdhfgj" or smth like this', () => {
    router.navigate('sfnjsahfjkwahefiubhaeripugvhjeuiregnuisdfrghusdhfgj');
    render(component);
    expect(screen.getByTestId(pageTestIds.unknownPage)).toBeInTheDocument();
  });
});

import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import UnknownPage from '../../pages/unknown-page/unknown-page';
import PrivateRoute from '../private-route/private-route';
import { Offer } from '../../types/offer';

type AppScreenProps = {
  offers: Offer[];
};

const createRouter = ({ offers }: AppScreenProps) => createBrowserRouter([
  {
    path: AppRoute.Main,
    children: [
      {
        index: true,
        element: <MainPage city={'Brussels'}offers={offers} />
      },
      {
        path: AppRoute.Favorites,
        element:
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
            <FavoritesPage offers={offers}/>
          </PrivateRoute>,
      },
      {
        path: AppRoute.Login,
        element: <LoginPage />,
      },
      {
        path: AppRoute.Offer,
        element: <OfferPage />
      },
      {
        path: '*',
        element: <UnknownPage />
      }
    ]
  }
]);

function App({ offers }: AppScreenProps): JSX.Element {
  return <RouterProvider router={createRouter({ offers })} />;
}

export default App;

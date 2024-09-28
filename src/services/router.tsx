import MainPage from '../pages/main-page/main-page';
import FavoritesPage from '../pages/favorites-page/favorites-page';
import LoginPage from '../pages/login-page/login-page';
import OfferPage from '../pages/offer-page/offer-page';
import { createBrowserRouter } from 'react-router-dom';
import { AppRoute } from '../const';
import UnknownPage from '../pages/unknown-page/unknown-page';
import PrivateRoute from '../components/private-route/private-route';

const createRouter = () => createBrowserRouter([
  {
    path: AppRoute.Main,
    children: [
      {
        index: true,
        element: <MainPage />
      },
      {
        path: AppRoute.Favorites,
        element:
          <PrivateRoute >
            <FavoritesPage />
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
        path: AppRoute.Unknown,
        element: <UnknownPage />
      }
    ]
  }
]);

export const router = createRouter();

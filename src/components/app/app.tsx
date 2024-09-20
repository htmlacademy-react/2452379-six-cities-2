import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import UnknownPage from '../../pages/unknown-page/unknown-page';
import PrivateRoute from '../private-route/private-route';


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
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
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
        path: '*',
        element: <UnknownPage />
      }
    ]
  }
]);

function App(): JSX.Element {
  return <RouterProvider router={createRouter()} />;
}

export default App;

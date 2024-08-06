import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import Layout from '../layout/layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import UnknownPage from '../../pages/unknown-page/unknown-page';
import PrivateRoute from '../private-route/private-route';

type AppScreenProps = {
  cardsCount: number;
}

const createRouter = ({ cardsCount }: AppScreenProps) => createBrowserRouter([
  {
    path: AppRoute.Main,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage cardsCount={cardsCount} />
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
function App({ cardsCount }: AppScreenProps): JSX.Element {
  return <RouterProvider router={createRouter({ cardsCount })} />;
}

export default App;

import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import Layout from '../layout/layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import UnknownPage from '../../pages/unknown-page/unknown-page';
import PrivateRoute from '../private-route/private-route';

type AppScreenProps = {
  cardsCount: number;
}

function App({ cardsCount }: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Layout />}
        >
          <Route index element={<MainPage cardsCount={cardsCount} />} />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute isAuthorized={false}>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Login}
            element={<LoginPage />}
          />
          <Route
            path={AppRoute.Offer}
            element={<OfferPage />}
          />
          <Route
            path='*'
            element={<UnknownPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

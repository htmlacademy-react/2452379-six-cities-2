import Layout from '../../components/layout/layout';
import Map from '../../components/map/map';
import PlacesList from '../../components/places-list/places-list';
import PlacesSortForm from '../../components/places-sort-form/places-sort-form';
import { Offer } from '../../types/offer';

type MainPageProps = {
  offers: Offer[];
}


export default function MainPage({ offers }: MainPageProps): JSX.Element {
  return (
    <Layout className="page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Paris</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Cologne</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Brussels</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item tabs__item--active">
                  <span>Amsterdam</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Hamburg</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Dusseldorf</span>
                </a>
              </li>
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">312 places to stay in Amsterdam</b>

              <PlacesSortForm/>

              <PlacesList offers={offers} displayType={'main'}></PlacesList>
            </section>
            <div className="cities__right-section">
              <Map displayType='main'/>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

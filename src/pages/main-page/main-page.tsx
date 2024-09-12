import clsx from 'clsx';
import Cities from '../../components/cities/cities';
import Layout from '../../components/layout/layout';
import { Offer } from '../../types/offer';

type MainPageProps = {
  offers: Offer[];
  city: string;
}

const availableLocations = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export default function MainPage({ offers, city }: MainPageProps): JSX.Element {
  const cityOffers = offers.filter((offer) => offer.city.name === city);
  const isFound = cityOffers.length > 0;

  return (
    <Layout className="page--gray page--main">
      <main className={clsx('page__main page__main--index', !isFound && 'page__main--index-empty')}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {
                availableLocations.map((location) =>
                  (
                    <li key={location} className="locations__item">
                      <a className={clsx('locations__item-link tabs__item', city === location && 'tabs__item--active')} href="#">
                        <span>{location}</span>
                      </a>
                    </li>
                  )
                )
              }
            </ul>
          </section>
        </div>

        <Cities city={city} offers={cityOffers} />

      </main>
    </Layout>
  );
}

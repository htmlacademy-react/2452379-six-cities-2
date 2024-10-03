import Layout from '../../components/layout/layout';
import './unknown-page.css';

function UnknownPage(): JSX.Element {
  return (
    <Layout>
      <main className="page__main page__main--index page__main--index-empty page__main--404">
        <div className="cities">
          <span style={{ fontSize: 404, alignSelf: 'center' }}>404</span>
          <div className="cities__status-wrapper tabs__content">
            <h2>{'If we knew what it was, but we don\'t know what it is'}</h2>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default UnknownPage;

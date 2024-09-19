import Cities from '../../components/cities/cities';
import Layout from '../../components/layout/layout';
import { Offer } from '../../types/offer';

type MainPageProps = {
  offers: Offer[];
}

export default function MainPage({ offers }: MainPageProps): JSX.Element {
  return (
    <Layout className="page--gray page--main">
      <Cities offers={offers} />
    </Layout>
  );
}

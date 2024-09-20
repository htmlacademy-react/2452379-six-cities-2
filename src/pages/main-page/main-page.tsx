import Cities from '../../components/cities/cities';
import Layout from '../../components/layout/layout';

export default function MainPage(): JSX.Element {
  return (
    <Layout className="page--gray page--main">
      <Cities />
    </Layout>
  );
}

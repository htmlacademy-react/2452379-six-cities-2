import Loading, { LoadingProps } from '../../loading/loading';

type CitiesEmptyProps = {
  isLoading: boolean;
}

const loadingProps: LoadingProps = {
  mainColor: '#4d81af',
  secondaryColor: '#f0f0f0',
  speed: 100,
  still: false,
  thickness: 100,
  svgProps: {}
};

export default function CitiesEmpty({ isLoading }: CitiesEmptyProps): JSX.Element {
  return (
    isLoading
      ? <Loading {...loadingProps} />
      : (
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
            </div>
          </section>
          <div className="cities__right-section"></div>
        </div>
      )
  );
}

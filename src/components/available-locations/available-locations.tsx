import clsx from 'clsx';
import { useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/cities-process/cities-process.slice';
import { AVAILABLE_LOCATIONS } from '../../const';
import { CityName } from '../../types/city';

type AvailableLocationsProps = {
  currentLocation: CityName;
};

export default function AvailableLocations({ currentLocation }: AvailableLocationsProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {
              AVAILABLE_LOCATIONS.map((location) => (
                <li
                  key={location}
                  className="locations__item"
                  onClick={() => dispatch(changeCity(location))}
                >
                  <a className={clsx('locations__item-link tabs__item', currentLocation === location && 'tabs__item--active')} href="#">
                    <span>{location}</span>
                  </a>
                </li>
              ))
            }
          </ul>
        </section>
      </div>
    </>
  );
}

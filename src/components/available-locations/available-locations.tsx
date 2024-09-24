import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/cities-process/cities-process.slice';
import { AVAILABLE_LOCATIONS } from '../../const';
import { getCity } from '../../store/cities-process/cities-process.selectors';


export default function AvailableLocations(): JSX.Element {
  const dispatch = useAppDispatch();
  const city = useAppSelector(getCity);

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
                  <a className={clsx('locations__item-link tabs__item', location === city && 'tabs__item--active')} href="#">
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

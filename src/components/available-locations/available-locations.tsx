import clsx from 'clsx';
import { useAppDispatch } from '../../hooks';
import { changeCityAction } from '../../store/actions';

type AvailableLocationsProps = {
  currentLocation: string;
};

const availableLocations = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];


export default function AvailableLocations({ currentLocation }: AvailableLocationsProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {
          availableLocations.map((location) => (
            <li
              key={location}
              className="locations__item"
              onClick={() => dispatch(changeCityAction(location))}
            >
              <a className={clsx('locations__item-link tabs__item', currentLocation === location && 'tabs__item--active')} href="#">
                <span>{location}</span>
              </a>
            </li>
          ))
        }
      </ul>
    </section>
  );
}

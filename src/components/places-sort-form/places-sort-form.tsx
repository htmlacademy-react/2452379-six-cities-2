import clsx from 'clsx';
import { useState } from 'react';
import { OfferSortType } from '../../types/sort';
import { offersSortTypes } from '../../const';

type PlacesSortFormProps = {
  type: OfferSortType;
  onSortChange: (sortType: OfferSortType) => void;
};

export default function PlacesSortForm({ type, onSortChange }: PlacesSortFormProps): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <form onClick={() => setIsOpened(!isOpened)} className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {type}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={clsx('places__options places__options--custom', isOpened ? 'places__options--opened' : 'places__options--closed')}>
        {
          Object
            .keys(offersSortTypes)
            .map((sortType) => (
              <li
                key={sortType}
                className={clsx('places__option', sortType === type && 'places__option--active')}
                onClick={() => onSortChange(sortType as OfferSortType)}
                tabIndex={0}
              >
                {sortType}
              </li>
            ))
        }
      </ul>
    </form>
  );
}

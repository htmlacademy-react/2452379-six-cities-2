import clsx from 'clsx';
import { useRef, useState } from 'react';
import { OfferSortType } from '../../../../types/sort';
import { offersSortTypes } from '../../../../const';
import { useOnClickOutside } from 'usehooks-ts';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { getSortType } from '../../../../store/slices/app/app.selectors';
import { changeSort } from '../../../../store/slices/app/app.slice';


const offerSortTypesTitles: Record<OfferSortType, string> = {
  'none': 'Popular',
  'priceAsc': 'Price: low to high',
  'priceDesc': 'Price: high to low',
  'topDesc': 'Top rated first'
};

export default function PlacesSortForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const type = useAppSelector(getSortType);
  const ref = useRef(null);
  const [isOpened, setIsOpened] = useState(false);
  useOnClickOutside(ref, () => setIsOpened(false));

  return (
    <form
      ref={ref}
      onClick={() => setIsOpened(!isOpened)}
      className="places__sorting"
      action="#"
      method="get"
      data-testid="PlacesSortForm"
    >
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {offerSortTypesTitles[type]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={clsx('places__options places__options--custom', isOpened ? 'places__options--opened' : 'places__options--closed')}
        data-testid="PlacesSortFormList"
      >
        {
          Object
            .keys(offersSortTypes)
            .map((sortType) => (
              <li
                key={sortType}
                className={clsx('places__option', sortType === type && 'places__option--active')}
                onClick={() => dispatch(changeSort(sortType as OfferSortType))}
                tabIndex={0}
                data-testid={sortType}
              >
                {offerSortTypesTitles[sortType as OfferSortType]}
              </li>
            ))
        }
      </ul>
    </form>
  );
}

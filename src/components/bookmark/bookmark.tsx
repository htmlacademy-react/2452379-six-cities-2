import clsx from 'clsx';
import { Size } from '../../types/common';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postFavoriteOfferStatus } from '../../store/slices/offers/offers.thunks';
import { OfferId } from '../../types/offer';
import { getIsAuthorized } from '../../store/slices/user/user.selectors';

type BookmarkProps = {
  offerId: OfferId;
  className: string;
  isBookmarked: boolean;
}

const iconSizes: { [key: string]: Size } = {
  default: {
    width: 18,
    height: 19
  },
  offer: {
    width: 31,
    height: 33
  }
};

export default function Bookmark({ offerId, className, isBookmarked }: BookmarkProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(getIsAuthorized);

  const handleClick = () => {
    if (isAuthorized) {
      dispatch(postFavoriteOfferStatus({ offerId, status: !isBookmarked }));
    }
  };

  return (
    <button
      className={clsx('button', `${className}__bookmark-button`, isBookmarked && `${className}__bookmark-button--active`)}
      onClick={handleClick}
      type="button"
    >
      <svg
        className={`${className}__bookmark-icon`}
        width={iconSizes[className]?.width || iconSizes['default'].width}
        height={iconSizes[className]?.height || iconSizes['default'].height}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isBookmarked ? 'In' : 'To'} bookmarks</span>
    </button>
  );
}

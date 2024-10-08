import clsx from 'clsx';
import { Size } from '../../types/common';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postFavoriteOfferStatusThunk } from '../../store/slices/offers/offers.thunks';
import { OfferId } from '../../types/offer';
import { getIsAuthorized } from '../../store/slices/user/user.selectors';
import { isOfferFavorite } from '../../store/slices/offers/offers.selectors';

type BookmarkProps = {
  offerId: OfferId;
  className: string;
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

export default function Bookmark({ offerId, className }: BookmarkProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(getIsAuthorized);
  const isFavorite = useAppSelector(isOfferFavorite(offerId));
  const isBookmarked = isAuthorized && isFavorite;

  const handleClick = () => {
    dispatch(postFavoriteOfferStatusThunk({ offerId, status: !isBookmarked }));
  };

  return (
    <button
      className={clsx('button', `${className}__bookmark-button`, isBookmarked && `${className}__bookmark-button--active`)}
      onClick={handleClick}
      type="button"
      data-testid="button"
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

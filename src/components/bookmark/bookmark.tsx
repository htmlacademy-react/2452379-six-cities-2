import clsx from 'clsx';
import { Size } from '../../types/common';

type BookmarkProps = {
  className: string;
  isBookmarked: boolean;
}

const iconSizes: {[key: string]: Size} = {
  default: {
    width: 18,
    height: 19
  },
  offer: {
    width: 31,
    height: 33
  }
};

export default function Bookmark({ className, isBookmarked }: BookmarkProps): JSX.Element {

  return (
    <button className={clsx('button', `${className}__bookmark-button`, isBookmarked && `${className}--active`)} type="button">
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

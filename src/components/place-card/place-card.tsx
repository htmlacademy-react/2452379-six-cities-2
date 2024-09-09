import clsx from 'clsx';
import { Offer, OfferType } from '../../types/offer';
import { PlaceCardDisplayType } from '../../types/place-card';
import { Link, generatePath } from 'react-router-dom';
import { AppRoute } from '../../const';

type PlaceCardProps = {
  offer: Offer;
  displayType: PlaceCardDisplayType;
  onCardMouseEnter?: (id: string) => void;
  onCardMouseLeave?: () => void;
}

const offerTypes: Record<OfferType, string> = {
  'apartment': 'Apartment',
  'hotel': 'Hotel',
  'room': 'Room',
  'house': 'House'
};

const previewSizes: Record<PlaceCardDisplayType, { width: number; height: number }> = {
  'main': {
    width: 260,
    height: 200
  },
  'favorite': {
    width: 150,
    height: 110
  }
};

const MAX_RATING = 5;
const calcRating = (value: number) => `${value * 100 / MAX_RATING}%`;

function PlaceCard({ offer, displayType, onCardMouseEnter, onCardMouseLeave }: PlaceCardProps): JSX.Element {
  const handleMouseEnter = () => {
    onCardMouseEnter?.(offer.id);
  };
  const handleMouseLeave = () => {
    onCardMouseLeave?.();
  };

  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={clsx('place-card', displayType === 'main' && 'cities__card', displayType === 'favorite' && 'favorites__card')}
    >
      {
        offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={clsx('place-card__image-wrapper', displayType === 'main' && 'cities__image-wrapper', displayType === 'favorite' && 'favorites__image-wrapper')}>
        <Link to={generatePath(AppRoute.Offer, { id: offer.id })}>
          <img className="place-card__image" src={offer.previewImage} width={previewSizes[displayType].width} height={previewSizes[displayType].height} alt="Place image" />
        </Link>
      </div>

      <div className={clsx('place-card__info', displayType === 'favorite' && 'favorites__card-info')}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={clsx('place-card__bookmark-button button', offer.isFavorite && 'place-card__bookmark-button--active')} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{offer.isFavorite ? 'In' : 'To'} bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: calcRating(offer.rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Offer, { id: offer.id })}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offerTypes[offer.type]}</p>
      </div>
    </article>
  );
}

export default PlaceCard;

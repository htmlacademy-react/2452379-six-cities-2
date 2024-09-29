import clsx from 'clsx';
import { Offer } from '../../../types/offer';
import { PlaceCardDisplayType } from '../../../types/place-card';
import { Link, generatePath } from 'react-router-dom';
import { AppRoute, offerTypes } from '../../../const';
import Bookmark from '../../bookmark/bookmark';
import { Size } from '../../../types/common';
import StarsRating from '../../stars-rating/stars-rating';

type PlaceCardProps = {
  offer: Offer;
  displayType: PlaceCardDisplayType;
  onCardMouseEnter?: (offer: Offer) => void;
  onCardMouseLeave?: (offer: null) => void;
}

const displayTypesClassNames: Record<PlaceCardDisplayType, { [k: string]: string }> = {
  main: {
    'place-card': 'cities__card',
    'place-card__image-wrapper': 'cities__image-wrapper',
  },
  favorite: {
    'place-card': 'favorites__card',
    'place-card__image-wrapper': 'favorites__image-wrapper',
    'place-card__info': 'favorites__card-info',
  },
  offer: {
    'place-card': 'near-places__card',
    'place-card__image-wrapper': 'near-places__image-wrapper',
  }
};

const previewSizes: Record<PlaceCardDisplayType, Size> = {
  'main': {
    width: 260,
    height: 200
  },
  'offer': {
    width: 260,
    height: 200
  },
  'favorite': {
    width: 150,
    height: 110
  }
};

function PlaceCard({ offer, displayType, onCardMouseEnter, onCardMouseLeave }: PlaceCardProps): JSX.Element {
  const handleMouseEnter = onCardMouseEnter && (() => {
    onCardMouseEnter(offer);
  });
  const handleMouseLeave = onCardMouseLeave && (() => {
    onCardMouseLeave(null);
  });

  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={clsx('place-card', displayTypesClassNames[displayType]['place-card'])}
    >
      {
        offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={clsx('place-card__image-wrapper', displayTypesClassNames[displayType]['place-card__image-wrapper'])}>
        <Link to={generatePath(AppRoute.Offer, { id: offer.id })}>
          <img className="place-card__image" src={offer.previewImage} width={previewSizes[displayType].width} height={previewSizes[displayType].height} alt="Place image" />
        </Link>
      </div>

      <div className={clsx('place-card__info', displayTypesClassNames[displayType]['place-card__info'])}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <Bookmark offerId={offer.id} className="place-card" isBookmarked={offer.isFavorite} />
        </div>
        <StarsRating className="place-card" rating={offer.rating} />
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Offer, { id: offer.id })}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offerTypes[offer.type]}</p>
      </div>
    </article>
  );
}

export default PlaceCard;

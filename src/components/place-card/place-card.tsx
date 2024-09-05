import clsx from 'clsx';
import { Offer, OfferType } from '../../types/offer';

type PlaceCardProps = {
  offer: Offer;
  isFavoritePage: boolean;
}

const offerTypes: Record<OfferType, string> = {
  'apartment': 'Apartment',
  'hotel': 'Hotel',
  'room': 'Room'
};

const calcRating = (value: number) => `${value * 20}%`;

function PlaceCard({ offer, isFavoritePage }: PlaceCardProps): JSX.Element {
  return (
    <article className="cities__card place-card">
      {
        offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={clsx('place-card__image-wrapper', isFavoritePage && 'favorites__image-wrapper', !isFavoritePage && 'cities__image-wrapper')}>
        <a href="#">
          <img className="place-card__image" src={offer.previewImage} width={isFavoritePage ? '150' : '260'} height={isFavoritePage ? '110' : '200'} alt="Place image" />
        </a>
      </div>

      <div className={isFavoritePage ? 'favorites__card-info place-card__info' : 'place-card__info'}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: calcRating(offer.rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{offer.title}</a>
        </h2>
        <p className="place-card__type">{offerTypes[offer.type]}</p>
      </div>
    </article>
  );
}

export default PlaceCard;

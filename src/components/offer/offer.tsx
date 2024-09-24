import { offerTypes } from '../../const';
import { type Offer, OfferFull } from '../../types/offer';
import { Review } from '../../types/review';
import Bookmark from '../bookmark/bookmark';
import Map from '../map/map';
import ReviewsList from '../reviews-list/reviews-list';
import StarsRating from '../stars-rating/stars-rating';

type OfferProps = {
  offer: OfferFull;
  nearOffers: Offer[];
  reviews: Review[];
}

const MAX_IMAGES_COUNT = 6;

export default function Offer({ offer, reviews, nearOffers }: OfferProps): JSX.Element {
  return (
    <section className="offer">
      <div className="offer__gallery-container container">
        <div className="offer__gallery">
          {
            offer.images.slice(0, MAX_IMAGES_COUNT).map((url) => (
              <div key={url} className="offer__image-wrapper">
                <img className="offer__image" src={url} alt="Photo studio" />
              </div>
            ))
          }
        </div>
      </div>
      <div className="offer__container container">
        <div className="offer__wrapper">
          {
            offer.isPremium &&
            <div className="offer__mark">
              <span>Premium</span>
            </div>
          }
          <div className="offer__name-wrapper">
            <h1 className="offer__name">
              {offer?.title}
            </h1>
            <Bookmark className="offer" isBookmarked={offer.isFavorite} />
          </div>
          <StarsRating className="offer" rating={offer.rating} showRatingValue />
          <ul className="offer__features">
            <li className="offer__feature offer__feature--entire">
              {offerTypes[offer.type]}
            </li>
            <li className="offer__feature offer__feature--bedrooms">
              {offer.bedrooms} Bedroom{offer.bedrooms > 1 && 's'}
            </li>
            <li className="offer__feature offer__feature--adults">
              Max {offer.maxAdults} adult{offer.maxAdults > 1 && 's'}
            </li>
          </ul>
          <div className="offer__price">
            <b className="offer__price-value">{offer?.price}</b>
            <span className="offer__price-text">&nbsp;night</span>
          </div>
          <div className="offer__inside">
            <h2 className="offer__inside-title">What&apos;s inside</h2>
            <ul className="offer__inside-list">
              {offer.goods.map((good) => (
                <li key={good} className="offer__inside-item">
                  {good}
                </li>
              ))}
            </ul>
          </div>
          <div className="offer__host">
            <h2 className="offer__host-title">Meet the host</h2>
            <div className="offer__host-user user">
              <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                <img className="offer__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar"></img>
              </div>
              <span className="offer__user-name">
                {offer.host.name}
              </span>
              {
                offer.host.isPro &&
                <span className="offer__user-status">
                  Pro
                </span>
              }
            </div>
            <div className="offer__description">
              {offer.description}
            </div>
          </div>
          {reviews.length > 0 && <ReviewsList reviews={reviews} />}
        </div>
      </div>
      <Map
        className="offer__map"
        offers={[offer, ...nearOffers]}
        anchor={offer.location}
        mapOptions={{ dragging: false, scrollWheelZoom: false, zoomControl: false }}
      />
    </section>
  );
}

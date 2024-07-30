type PlaceCardProps = {
  isFavoritesPage: boolean;
}

function PlaceCard({isFavoritesPage}: PlaceCardProps): JSX.Element {
  return (
    <article className="cities__card place-card">
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      <div className={ isFavoritesPage ? 'favorites__image-wrapper place-card__image-wrapper' : 'cities__image-wrapper place-card__image-wrapper' }>
        <a href="#">
          <img className="place-card__image" src="img/apartment-01.jpg"width={ isFavoritesPage ? '150' : '260' } height={ isFavoritesPage ? '110' : '200' } alt="Place image" />
        </a>
      </div>

      <div className={isFavoritesPage ? 'favorites__card-info place-card__info' : 'place-card__info'}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;120</b>
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
            <span style={{ width: '80%' }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">Beautiful &amp; luxurious apartment at great location</a>
        </h2>
        <p className="place-card__type">Apartment</p>
      </div>
    </article>
  );
}

/*
<article class="favorites__card place-card">
  <div class="place-card__mark">
    <span>Premium</span>
  </div>
  <div class="favorites__image-wrapper place-card__image-wrapper">
    <a href="#">
      <img class="place-card__image" src="img/apartment-small-03.jpg" width="150" height="110" alt="Place image">
    </a>
  </div>
  <div class="favorites__card-info place-card__info">
    <div class="place-card__price-wrapper">
      <div class="place-card__price">
        <b class="place-card__price-value">&euro;180</b>
        <span class="place-card__price-text">&#47;&nbsp;night</span>
      </div>
      <button class="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
        <svg class="place-card__bookmark-icon" width="18" height="19">
          <use xlink:href="#icon-bookmark"></use>
        </svg>
        <span class="visually-hidden">In bookmarks</span>
      </button>
    </div>
    <div class="place-card__rating rating">
      <div class="place-card__stars rating__stars">
        <span style="width: 100%"></span>
        <span class="visually-hidden">Rating</span>
      </div>
    </div>
    <h2 class="place-card__name">
      <a href="#">Nice, cozy, warm big bed apartment</a>
    </h2>
    <p class="place-card__type">Apartment</p>
  </div>
</article>

<article className="cities__card place-card">
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src="img/apartment-01.jpg" width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;120</b>
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
            <span style={{ width: '80%' }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">Beautiful &amp; luxurious apartment at great location</a>
        </h2>
        <p className="place-card__type">Apartment</p>
      </div>
    </article>
*/

export default PlaceCard;

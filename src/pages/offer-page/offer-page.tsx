import { useParams } from 'react-router-dom';
import Layout from '../../components/layout/layout';
import Offer from '../../components/offer/offer';
import { useEffect } from 'react';
import PlacesList from '../../components/places-list/places-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { isOfferFull } from '../../types/offer';
import { getActiveOffer, getOffersNearby } from '../../store/slices/offers/offers.selectors';
import { getOfferThunk, getOffersNearbyThunk } from '../../store/slices/offers/offers.thunks';
import { getReviewsThunk } from '../../store/slices/reviews/reviews.thunks';

const MAX_OFFERS_NEARBY_COUNT = 3;

function OfferPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const offer = useAppSelector(getActiveOffer);
  const nearbyOffers = useAppSelector(getOffersNearby).slice(0, MAX_OFFERS_NEARBY_COUNT);
  const offerId = useParams().id;

  useEffect(() => {
    if (offerId) {
      dispatch(getOfferThunk(offerId));
      dispatch(getOffersNearbyThunk(offerId));
      dispatch(getReviewsThunk(offerId));
    }
  }, [offerId, dispatch]);

  useEffect(() => {
    scrollTo({ top: 0 });
  }, [offerId]);

  return (
    <Layout>
      <main className="page__main page__main--offer" data-testid="OfferPage">
        {isOfferFull(offer) && <Offer offer={offer} offersNearby={nearbyOffers} />}
        <div className="container">
          {nearbyOffers && <PlacesList offers={nearbyOffers} displayType='offer' />}
        </div>
      </main>
    </Layout>
  );
}

export default OfferPage;

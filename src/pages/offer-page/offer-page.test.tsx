import { render } from '@testing-library/react';
import { withMockStore, withRouter } from '../../utils/mock-components';
import { createFakeOffersSlice, createFakeAppSlice, createFakeUserSlice, createFakeReviewsSlice, extractActions } from '../../utils/mocks';
import { State } from '../../store/type';
import OfferPage from './offer-page';
import { getOffersNearbyThunk, getOfferThunk } from '../../store/slices/offers/offers.thunks';
import { getReviewsThunk } from '../../store/slices/reviews/reviews.thunks';

describe('Component: OfferPage', () => {
  const initialState: State = {
    OFFERS: createFakeOffersSlice(),
    USER: createFakeUserSlice(),
    APP: createFakeAppSlice(),
    REVIEWS: createFakeReviewsSlice()
  };

  it('should render and dispatch "getOfferThunk", "getOffersNearbyThunk", "getReviewsThunk"', () => {
    const { component, store } = withMockStore(withRouter(<OfferPage />), initialState);
    vi.mock('react-router-dom', async () => ({
      ...(await vi.importActual('react-router-dom')),
      useParams: () => ({ id: 'test' }),
    }));

    render(component);

    const extractedActions = extractActions(store.getActions());
    expect(extractedActions).toEqual([
      getOfferThunk.pending.type,
      getOffersNearbyThunk.pending.type,
      getReviewsThunk.pending.type
    ]);
  });
});

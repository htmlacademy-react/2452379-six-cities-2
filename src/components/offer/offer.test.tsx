import { render, screen } from '@testing-library/react';
import Offer from './offer';
import { createFakeAppSlice, createFakeFullOffer, createFakeOffers, createFakeOffersSlice, createFakeReviewsSlice, createFakeUserSlice } from '../../utils/mocks';
import { State } from '../../store/type';
import { withMockStore, withRouter } from '../../utils/mock-components';

describe('Component: Offer', () => {
  const mapTestId = 'Map';
  const reviewsListTestId = 'ReviewsList';
  it('should render correctly', () => {
    const initialState: State = {
      OFFERS: createFakeOffersSlice(),
      APP: createFakeAppSlice(),
      USER: createFakeUserSlice(),
      REVIEWS: createFakeReviewsSlice()
    };
    const offer = createFakeFullOffer();
    const { component } = withMockStore(withRouter(<Offer offer={offer} offersNearby={createFakeOffers(3)} />), initialState);

    render(component);

    expect(screen.getByTestId(mapTestId)).toBeInTheDocument();
    expect(screen.getByTestId(reviewsListTestId)).toBeInTheDocument();
    expect(screen.getByText(offer.host.name)).toBeInTheDocument();
    expect(screen.getByText(offer.description)).toBeInTheDocument();
  });
});

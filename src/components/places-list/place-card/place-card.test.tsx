import { render, screen } from '@testing-library/react';
import { NameSpace } from '../../../const';
import { State } from '../../../store/type';
import { withMockStore, withRouter } from '../../../utils/mock-components';
import { createFakeAppSlice, createFakeOffer, createFakeOffersSlice, createFakeUserSlice } from '../../../utils/mocks';
import PlaceCard from './place-card';

describe('Component: PlaceCard', () => {
  const initialState: Omit<State, NameSpace.Reviews> = {
    APP: createFakeAppSlice(),
    USER: createFakeUserSlice(),
    OFFERS: createFakeOffersSlice()
  };
  const starsRatingTestId = 'StarsRating';

  it('should render correctly', () => {
    const offer = createFakeOffer();
    const { component } = withMockStore(withRouter(<PlaceCard offer={offer} displayType='main' />), initialState);

    render(component);

    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByTestId(starsRatingTestId)).toBeInTheDocument();
  });
});

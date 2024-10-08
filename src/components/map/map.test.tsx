import { render, screen } from '@testing-library/react';
import { NameSpace } from '../../const';
import { State } from '../../store/type';
import { createFakeOffersSlice } from '../../utils/mocks';
import { withMockStore } from '../../utils/mock-components';
import Map from './map';

describe('Component: Map', () => {
  it('should render correctly', () => {
    const testId = 'Map';
    const initialState: Pick<State, NameSpace.Offers> = { OFFERS: createFakeOffersSlice() };
    const { component } = withMockStore(<Map offers={[]} anchor={{ latitude: 0, longitude: 0, zoom: 0 }} />, initialState);

    render(component);

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});

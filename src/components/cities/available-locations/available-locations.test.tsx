import { screen, render } from '@testing-library/react';
import AvailableLocations from './available-locations';
import { withMockStore } from '../../../utils/mock-components';
import { State } from '../../../store/type';
import { AVAILABLE_LOCATIONS, NameSpace } from '../../../const';

describe('Component: AvailableLocations', () => {
  it('should render correctly', () => {
    const activeCityClass = 'tabs__item--active';
    const initialState: Pick<State, NameSpace.App> = { APP: { city: 'Paris', sortType: 'none' } };

    const { component } = withMockStore(<AvailableLocations />, initialState);
    render(component);

    for(let i = 0; i < AVAILABLE_LOCATIONS.length; i++) {
      expect(screen.getByText(AVAILABLE_LOCATIONS[i])).toBeInTheDocument();
    }
    expect(screen.getByTestId(initialState.APP.city)).toHaveClass(activeCityClass);
  });
});

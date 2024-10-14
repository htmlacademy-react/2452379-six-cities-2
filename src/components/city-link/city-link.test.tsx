import { fireEvent, render, screen } from '@testing-library/react';
import CityLink from './city-link';
import { CityName } from '../../types/city';
import { withMockStore, withRouter } from '../../utils/mock-components';
import { NameSpace } from '../../const';
import { createFakeAppSlice, extractActions } from '../../utils/mocks';
import { changeCity } from '../../store/slices/app/app.slice';
import { State } from '../../store/type';

describe('Component: CityLink', () => {
  const testId = 'CityLink';
  const initialState: Pick<State, NameSpace.App> = { APP: createFakeAppSlice() };
  it('should dispatch "changeCity" on click', () => {
    const city: CityName = 'Amsterdam';
    const { component, store } = withMockStore(withRouter(<CityLink city={city} />), initialState);

    render(component);
    fireEvent.click(screen.getByTestId(testId));

    const extractedActions = extractActions(store.getActions());

    expect(extractedActions).toEqual([changeCity.type]);
  });
});

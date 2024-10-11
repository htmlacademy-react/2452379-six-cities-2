import { screen, render } from '@testing-library/react';
import CitiesEmpty from './cities-empty';
import { withMockStore } from '../../../utils/mock-components';
import { State } from '../../../store/type';
import { NameSpace } from '../../../const';

describe('Component: CitiesEmpty', () => {
  it('should render correctly', () => {
    const initialState: Pick<State, NameSpace.App> = { APP: { city: 'Paris', sortType: 'none' } };
    const noPlacesText = 'No places to stay available';
    const couldNotFindText = `We could not find any property available at the moment in ${initialState.APP.city}`;

    const { component } = withMockStore(<CitiesEmpty />, initialState);
    render(component);

    expect(screen.getByText(couldNotFindText)).toBeInTheDocument();
    expect(screen.getByText(noPlacesText)).toBeInTheDocument();
  });
});

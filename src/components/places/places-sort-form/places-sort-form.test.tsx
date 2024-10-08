import { render, screen } from '@testing-library/react';
import { State } from '../../../store/type';
import { NameSpace, SORT_TYPES } from '../../../const';
import { createFakeAppSlice } from '../../../utils/mocks';
import { withMockStore } from '../../../utils/mock-components';
import PlacesSortForm from './places-sort-form';
import userEvent from '@testing-library/user-event';

describe('Component: PlacesSortForm', () => {
  const initialState: Pick<State, NameSpace.App> = {
    APP: createFakeAppSlice()
  };
  const openedClass = 'places__options--opened';
  const closedClass = 'places__options--closed';
  const testId = 'PlacesSortForm';
  const sortTypesListTestId = 'PlacesSortFormList';

  it('should render correctly', () => {
    const activeSortClass = 'places__option--active';
    const { component } = withMockStore(<PlacesSortForm />, initialState);
    render(component);

    for (let i = 0; i < SORT_TYPES.length; i++) {
      expect(screen.getByTestId(SORT_TYPES[i])).toBeInTheDocument();
    }
    expect(screen.getByTestId(initialState.APP.sortType)).toHaveClass(activeSortClass);
    expect(screen.getByTestId(sortTypesListTestId)).toHaveClass(closedClass);
  });

  it('should open on click', async () => {
    const { component } = withMockStore(<PlacesSortForm />, initialState);
    render(component);

    await userEvent.click(screen.getByTestId(testId));

    expect(screen.getByTestId(sortTypesListTestId)).toHaveClass(openedClass);
  });

  it('should close on second click', async () => {
    const { component } = withMockStore(<PlacesSortForm />, initialState);
    render(component);

    await userEvent.click(screen.getByTestId(testId));
    await userEvent.click(screen.getByTestId(testId));

    expect(screen.getByTestId(sortTypesListTestId)).toHaveClass(closedClass);
  });
});

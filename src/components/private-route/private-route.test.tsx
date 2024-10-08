import { render, screen } from '@testing-library/react';
import { FetchStatus, NameSpace } from '../../const';
import { State } from '../../store/type';
import { withMockStore, withRouter } from '../../utils/mock-components';
import { createFakeUserSlice } from '../../utils/mocks';
import PrivateRoute from './private-route';

describe('Component: PrivateRoute', () => {
  const testText = 'test';
  const testChild = <div>{testText}</div>;
  it('should not pass to children if unauthorized', () => {
    const initialState: Pick<State, NameSpace.User> = { USER: createFakeUserSlice() };
    const { component } = withMockStore(withRouter(<PrivateRoute>{testChild}</PrivateRoute>), initialState);

    render(component);
    expect(screen.queryByText(testText)).not.toBeInTheDocument();
  });
  it('should pass to children if authorized', () => {
    const initialState: Pick<State, NameSpace.User> = { USER: createFakeUserSlice({ fetchStatus: FetchStatus.Fullfilled }) };
    const { component } = withMockStore(withRouter(<PrivateRoute>{testChild}</PrivateRoute>), initialState);

    render(component);
    expect(screen.getByText(testText)).toBeInTheDocument();
  });
});

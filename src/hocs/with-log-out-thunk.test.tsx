import { render, screen } from '@testing-library/react';
import { AuthorizationStatus, NameSpace } from '../const';
import { logOutThunk } from '../store/slices/user/user.thunks';
import { State } from '../store/type';
import { withMockStore } from '../utils/mock-components';
import { createFakeUserSlice, extractActions } from '../utils/mocks';
import WithLogOutThunk from './with-logout-thunk';

describe('HOC: WithLogOutThunk', () => {
  const testText = 'test';
  const testChild = <div>{testText}</div>;

  it('should not dispatch logOutThunk when unauthorized and return child', () => {
    const initialState: Pick<State, NameSpace.User> = {
      USER: createFakeUserSlice()
    };

    const { component, store } = withMockStore(<WithLogOutThunk>{testChild}</WithLogOutThunk>, initialState);
    render(component);

    const extractedActions = extractActions(store.getActions());
    expect(screen.getByText(testText)).toBeInTheDocument();
    expect(extractedActions).toEqual([]);
  });

  it('should dispatch logOutThunk when authorized and return child', () => {
    const initialState: Pick<State, NameSpace.User> = {
      USER: createFakeUserSlice({ authStatus: AuthorizationStatus.Auth })
    };

    const { component, store } = withMockStore(<WithLogOutThunk>{testChild}</WithLogOutThunk>, initialState);
    render(component);

    const extractedActions = extractActions(store.getActions());
    expect(screen.getByText(testText)).toBeInTheDocument();
    expect(extractedActions).toEqual([logOutThunk.pending.type]);
  });
});

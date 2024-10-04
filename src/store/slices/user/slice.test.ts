import { AuthorizationStatus, FetchStatus } from '../../../const';
import { createFakeUserData } from '../../../utils/mocks';
import { UserSlice } from './type';
import { userSlice } from './user.slice';
import { fetchAuthThunk, logInThunk, logOutThunk } from './user.thunks';

describe('User Slice', () => {
  const initialState: UserSlice = {
    authStatus: AuthorizationStatus.Unknown,
    userData: null,
    fetchStatus: FetchStatus.Idle
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = userSlice.reducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };

    const result = userSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(initialState);
  });

  describe('fetchAuthThunk', () => {
    it('should set "fetchStatus" to "Pending" with pending action', () => {
      const action = fetchAuthThunk.pending;
      const expectedState: UserSlice = {
        ...initialState,
        fetchStatus: FetchStatus.Pending
      };

      const result = userSlice.reducer(initialState, action);

      expect(result).toEqual(expectedState);
    });

    it('should set "userData" to object, "fetchStatus" to "Fullfilled", "authStatus" to "Auth" with fullfilled action', () => {
      const userData = createFakeUserData();
      const action = fetchAuthThunk.fulfilled(userData, '', undefined);
      const expectedState: UserSlice = {
        userData,
        fetchStatus: FetchStatus.Fullfilled,
        authStatus: AuthorizationStatus.Auth,
      };

      const result = userSlice.reducer(initialState, action);

      expect(result).toEqual(expectedState);
    });

    it('should set "fetchStatus" to "Rejected", "authStatus" to "NoAuth" with rejected action', () => {
      const action = fetchAuthThunk.rejected;
      const expectedState: UserSlice = {
        ...initialState,
        fetchStatus: FetchStatus.Rejected,
        authStatus: AuthorizationStatus.NoAuth
      };

      const result = userSlice.reducer(initialState, action);

      expect(result).toEqual(expectedState);
    });
  });

  describe('logInThunk', () => {
    it('should set "fetchStatus" to "Pending" with pending action', () => {
      const action = logInThunk.pending;
      const expectedState: UserSlice = {
        ...initialState,
        fetchStatus: FetchStatus.Pending
      };

      const result = userSlice.reducer(initialState, action);

      expect(result).toEqual(expectedState);
    });

    it('should set "userData" to object, "fetchStatus" to "Fullfilled", "authStatus" to "Auth" with fullfilled action', () => {
      const userData = createFakeUserData();
      const action = logInThunk.fulfilled(userData, '', { email: '', password: '' });
      const expectedState: UserSlice = {
        userData,
        fetchStatus: FetchStatus.Fullfilled,
        authStatus: AuthorizationStatus.Auth,
      };

      const result = userSlice.reducer(initialState, action);

      expect(result).toEqual(expectedState);
    });

    it('should set "fetchStatus" to "Rejected", "authStatus" to "NoAuth" with rejected action', () => {
      const action = logInThunk.rejected;
      const expectedState: UserSlice = {
        ...initialState,
        fetchStatus: FetchStatus.Rejected,
        authStatus: AuthorizationStatus.NoAuth
      };

      const result = userSlice.reducer(initialState, action);

      expect(result).toEqual(expectedState);
    });
  });

  describe('logOutThunk', () => {
    it('should set "userData" to null, "fetchStatus" to "Fullfilled", "authStatus" to "Auth" with fullfilled action', () => {
      const subInitialState: UserSlice = { ...initialState, userData: createFakeUserData() };
      const action = logOutThunk.fulfilled;
      const expectedState: UserSlice = {
        ...subInitialState,
        userData: null,
        authStatus: AuthorizationStatus.NoAuth,
      };

      const result = userSlice.reducer(subInitialState, action);

      expect(result).toEqual(expectedState);
    });

    it('should set "fetchStatus" to "Rejected", "authStatus" to "NoAuth" with rejected action', () => {
      const subInitialState: UserSlice = { ...initialState, userData: createFakeUserData() };
      const action = logOutThunk.rejected;
      const expectedState: UserSlice = {
        ...subInitialState,
        userData: null,
        authStatus: AuthorizationStatus.NoAuth,
      };

      const result = userSlice.reducer(subInitialState, action);

      expect(result).toEqual(expectedState);
    });
  });
});

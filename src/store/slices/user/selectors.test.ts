import { describe, expect } from 'vitest';
import { AuthorizationStatus, FetchStatus, NameSpace } from '../../../const';
import { UserSlice } from './type';
import { getAuthFetchStatus, getIsAuthorized, getUserEmail } from './user.selectors';

describe('Reviews Slice selectors', () => {
  const state = {
    [NameSpace.User]: {
      authStatus: AuthorizationStatus.Unknown,
      userData: null,
      fetchStatus: FetchStatus.Idle
    } as UserSlice
  };

  it('should return is authorized', () => {
    const { authStatus } = state[NameSpace.User];
    const result = getIsAuthorized(state);
    expect(result).toBe(authStatus === AuthorizationStatus.Auth);
  });

  it('should return user email', () => {
    const { userData } = state[NameSpace.User];
    const result = getUserEmail(state);
    expect(result).toBe(userData?.email);
  });

  it('should return auth fetch status', () => {
    const { fetchStatus } = state[NameSpace.User];
    const result = getAuthFetchStatus(state);
    expect(result).toEqual({
      isLoading: fetchStatus === FetchStatus.Idle || fetchStatus === FetchStatus.Pending,
      isRejected: fetchStatus === FetchStatus.Rejected,
      isFulfilled: fetchStatus === FetchStatus.Fullfilled
    });
  });
});

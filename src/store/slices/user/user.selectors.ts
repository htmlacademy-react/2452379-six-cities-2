import { AuthorizationStatus, FetchStatus, NameSpace } from '../../../const';
import { State } from '../../type';

type UserState = Pick<State, NameSpace.User>;

export const getIsAuthorized = ({ USER }: UserState) => USER.authStatus === AuthorizationStatus.Auth;
export const getUserEmail = ({ USER }: UserState) => USER.userData?.email;
export const getAuthFetchStatus = ({ USER }: UserState) => ({
  isLoading: USER.fetchStatus === FetchStatus.Idle || USER.fetchStatus === FetchStatus.Pending,
  isRejected: USER.fetchStatus === FetchStatus.Rejected,
  isFulfilled: USER.fetchStatus === FetchStatus.Fullfilled
});

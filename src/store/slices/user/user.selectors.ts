import { FetchStatus, NameSpace } from '../../../const';
import { State } from '../../type';

type UserState = Pick<State, NameSpace.User>;

export const getAuthStatus = ({ USER }: UserState) => USER.authStatus;
export const getUserEmail = ({ USER }: UserState) => USER.userData?.email;
export const getAuthFetchStatus = ({ USER }: UserState) => ({
  isLoading: USER.fetchStatus === FetchStatus.Idle || USER.fetchStatus === FetchStatus.Pending,
  isRejected: USER.fetchStatus === FetchStatus.Rejected,
  isFulfilled: USER.fetchStatus === FetchStatus.Fullfilled
});

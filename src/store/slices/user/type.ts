import { AuthorizationStatus, FetchStatus } from '../../../const';
import { UserData } from '../../../types/user';

export type UserSlice = {
  authStatus: AuthorizationStatus;
  userData: UserData | null;
  fetchStatus: FetchStatus;
}

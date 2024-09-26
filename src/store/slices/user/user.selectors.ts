import { NameSpace } from '../../../const';
import { State } from '../../type';

type UserState = Pick<State, NameSpace.User>;

export const getAuthStatus = ({USER}: UserState) => USER.authStatus;
export const getUserEmail = ({USER}: UserState) => USER.userData?.email;

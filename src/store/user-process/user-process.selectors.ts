import { NameSpace } from '../../const';
import { State } from '../../types/state';

type UserState = Pick<State, NameSpace.User>;

export const getAuthStatus = ({USER}: UserState) => USER.authStatus;

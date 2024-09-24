import { NameSpace } from '../../const';
import { State } from '../../types/state';

type SortState = Pick<State, NameSpace.Sort>;

export const getSortType = ({SORT}: SortState) => SORT.type;

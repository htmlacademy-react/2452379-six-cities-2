import { NameSpace } from '../../const';
import { State } from '../../types/state';

type CitiesState = Pick<State, NameSpace.Cities>;

export const getCity = ({ CITIES }: CitiesState) => CITIES.city;

import { AVAILABLE_LOCATIONS } from '../const';
import { MapData } from './common';

export type CityName = typeof AVAILABLE_LOCATIONS[number];

export type City = {
  name: CityName;
  location: MapData;
}

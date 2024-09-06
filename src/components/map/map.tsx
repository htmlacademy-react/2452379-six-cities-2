import clsx from 'clsx';
import { MapDisplayType } from '../../types/map';

type MapProps = {
  displayType: MapDisplayType;
}

const displayTypes: Record<MapDisplayType, string> = {
  'main': 'cities__map',
  'offer': 'offer__map'
}

export default function Map({displayType}: MapProps): JSX.Element {
  return (
    <section className={clsx('map', displayTypes[displayType])}></section>
  );
}

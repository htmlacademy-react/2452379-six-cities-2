import clsx from 'clsx';
import { MapDisplayType } from '../../types/map';
import { ActiveCardId } from '../../types/place-card';

type MapProps = {
  displayType: MapDisplayType;
  activeCardId: ActiveCardId;
}

const displayTypes: Record<MapDisplayType, string> = {
  'main': 'cities__map',
  'offer': 'offer__map'
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Map({activeCardId, displayType}: MapProps): JSX.Element {
  return (
    <section className={clsx('map', displayTypes[displayType])}></section>
  );
}

import clsx from 'clsx';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapData, MapDisplayType } from '../../types/map';
import { useEffect, useRef } from 'react';
import { Offer } from '../../types/offer';

type MapProps = {
  displayType: MapDisplayType;
  activeCardId: Offer['id'] | null;
  city: MapData;
  offers: Offer[];
}

const displayTypes: Record<MapDisplayType, string> = {
  'main': 'cities__map',
  'offer': 'offer__map'
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Map({ activeCardId, displayType, city, offers }: MapProps): JSX.Element {
  const mapElement = useRef<HTMLDivElement>(null);
  const map = useRef<leaflet.Map>();

  useEffect(() => {
    if (!map.current) {
      map.current =
        leaflet
          .map(mapElement.current as HTMLElement)
          .setView({ lat: city.latitude, lng: city.longitude }, city.zoom);

      leaflet
        .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
        .addTo(map.current);

      offers.forEach(({location}) => {
        leaflet
          .marker({lat: location.latitude, lng: location.longitude})
          .addTo(map.current as leaflet.Map);
      });
    }

  }, []);

  return (
    <section className={clsx('map', displayTypes[displayType])}>
      <div ref={mapElement} style={{ 'height': '100%' }}></div>
    </section>
  );
}

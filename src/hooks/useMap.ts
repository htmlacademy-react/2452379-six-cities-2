import { useEffect, useRef } from 'react';
import { MapData } from '../types/map';
import leaflet from 'leaflet';

export default function useMap(mapElementRef:React.RefObject<HTMLDivElement>, city: MapData) {
  const mapRef = useRef<leaflet.Map>();

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current =
        leaflet
          .map(mapElementRef.current as HTMLElement)
          .setView({ lat: city.latitude, lng: city.longitude }, city.zoom);

      leaflet
        .tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        })
        .addTo(mapRef.current);
    }
  }, [mapElementRef, city]);

  return mapRef;
}

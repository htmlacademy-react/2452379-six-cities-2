import clsx from 'clsx';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { OfferLocation } from '../../types/offer';
import useMap from '../../hooks/useMap';
import { MapData } from '../../types/common';
import { useAppSelector } from '../../hooks';
import { getActiveOfferLocation } from '../../store/offers-process/offers-process.selectors';

type MapProps = {
  className: string;
  offers: OfferLocation[];
  anchor: MapData;
  mapOptions?: leaflet.MapOptions;
}

const markerTypes = {
  default: {
    icon: new leaflet.Icon({
      iconUrl: 'img/pin.svg',
      iconSize: [27, 39],
      iconAnchor: [13, 39]
    })
  },
  active: {
    icon: new leaflet.Icon({
      iconUrl: 'img/pin-active.svg',
      iconSize: [27, 39],
      iconAnchor: [13, 39]
    })
  },
};

export default function Map({ className, offers, anchor, mapOptions }: MapProps): JSX.Element {
  const activeLocation = useAppSelector(getActiveOfferLocation);
  const mapElementRef = useRef<HTMLDivElement>(null);
  const mapRef = useMap(mapElementRef, anchor, mapOptions);

  useEffect(() => {
    const markerLayer = new leaflet.LayerGroup();
    offers
      ?.forEach(({ id, location }) => {
        leaflet
          .marker({ lat: location.latitude, lng: location.longitude }, id === activeLocation?.id ? markerTypes.active : markerTypes.default)
          .addTo(markerLayer);
      });

    mapRef.current?.addLayer(markerLayer);

    mapRef.current?.flyTo({
      lat: activeLocation?.location.latitude || anchor.latitude,
      lng: activeLocation?.location.longitude || anchor.longitude
    }, activeLocation?.location.zoom || anchor.zoom);

    return () => {
      mapRef.current?.removeLayer(markerLayer);
    };
  }, [mapRef, offers, activeLocation, anchor]);

  return (
    <section className={clsx('map', className)}>
      <div ref={mapElementRef} style={{ 'height': '100%' }} ></div>
    </section>
  );
}

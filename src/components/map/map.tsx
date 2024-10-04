import clsx from 'clsx';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { OfferLocation } from '../../types/offer';
import useMap from '../../hooks/useMap';
import { MapData } from '../../types/common';
import { useAppSelector } from '../../hooks';
import { getActiveOfferLocation } from '../../store/slices/offers/offers.selectors';

type MapProps = {
  className: string;

  offers: OfferLocation[];
  anchor: MapData & { isActiveLocation?: boolean };
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
  const mapElementRef = useRef<HTMLDivElement>(null);
  const mapRef = useMap(mapElementRef, anchor, mapOptions);
  const activeOfferLocation = useAppSelector(getActiveOfferLocation);
  const activeLocation = anchor.isActiveLocation ? anchor : activeOfferLocation;

  useEffect(() => {
    const markerLayer = new leaflet.LayerGroup();
    offers
      ?.forEach(({ location }) => {
        leaflet
          .marker({ lat: location.latitude, lng: location.longitude }, markerTypes.default)
          .addTo(markerLayer);
      });

    if (activeLocation) {
      leaflet
        .marker({ lat: activeLocation.latitude, lng: activeLocation.longitude }, markerTypes.active)
        .addTo(markerLayer);
    }

    mapRef.current?.addLayer(markerLayer);

    mapRef.current?.flyTo({
      lat: activeLocation?.latitude || anchor.latitude,
      lng: activeLocation?.longitude || anchor.longitude
    }, activeLocation?.zoom || anchor.zoom);

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

import clsx from 'clsx';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { Offer } from '../../types/offer';
import useMap from '../../hooks/useMap';
import { MapData } from '../../types/common';

type MapProps = {
  className: string;
  activeOffer: Pick<Offer, 'id' | 'location'> | null;
  offers: Pick<Offer, 'id' | 'location' | 'city'>[];
  anchor: MapData;
  flyToActive?: boolean;
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

export default function Map({ activeOffer, className, offers, anchor, mapOptions, flyToActive = false }: MapProps): JSX.Element {
  const mapElementRef = useRef<HTMLDivElement>(null);
  const mapRef = useMap(mapElementRef, anchor, mapOptions);

  useEffect(() => {
    const markerLayer = new leaflet.LayerGroup();
    offers
      ?.forEach(({ id, location }) => {
        leaflet
          .marker({ lat: location.latitude, lng: location.longitude }, id === activeOffer?.id ? markerTypes.active : markerTypes.default)
          .addTo(markerLayer);
      });

    mapRef.current?.addLayer(markerLayer);

    if (flyToActive) {
      mapRef.current?.flyTo({
        lat: activeOffer?.location.latitude || anchor.latitude,
        lng: activeOffer?.location.longitude || anchor.longitude
      }, activeOffer?.location.zoom || anchor.zoom);
    }

    return () => {
      mapRef.current?.removeLayer(markerLayer);
    };
  }, [mapRef, offers, activeOffer]);

  return (
    <section className={clsx('map', className)}>
      <div ref={mapElementRef} style={{ 'height': '100%' }} ></div>
    </section>
  );
}

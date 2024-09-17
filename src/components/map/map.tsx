import clsx from 'clsx';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapData } from '../../types/map';
import { useEffect, useRef } from 'react';
import { Offer } from '../../types/offer';
import useMap from '../../hooks/useMap';

type MapProps = {
  className: string;
  activeOfferId: Offer['id'] | null;
  city: MapData;
  offers: Offer[];
}

const markerTypes = {
  default: {
    icon: new leaflet.Icon({
      iconUrl: '../../../public/img/pin.svg',
      iconSize: [27, 39]
    })
  },
  active: {
    icon: new leaflet.Icon({
      iconUrl: '../../../public/img/pin-active.svg',
      iconSize: [27, 39]
    })
  },
};

export default function Map({ activeOfferId, city, className, offers }: MapProps): JSX.Element {
  const mapElementRef = useRef<HTMLDivElement>(null);
  const mapRef = useMap(mapElementRef, city);

  useEffect(() => {
    const markerLayer = new leaflet.LayerGroup();
    offers
      .forEach(({ id, location }) => {
        leaflet
          .marker({ lat: location.latitude, lng: location.longitude }, id === activeOfferId ? markerTypes.active : markerTypes.default)
          .addTo(markerLayer);
      });

    mapRef.current?.addLayer(markerLayer);

    if (activeOfferId) {
      const activeOffer: Offer | undefined = offers.find(({ id }) => id === activeOfferId);
      if (activeOffer) {
        mapRef.current?.flyTo({
          lat: activeOffer.location.latitude,
          lng: activeOffer.location.longitude
        }, activeOffer.location.zoom);
      }
    } else {
      mapRef.current?.flyTo({
        lat: offers[0].city.location.latitude,
        lng: offers[0].city.location.longitude
      }, offers[0].city.location.zoom);
    }

    return () => {
      mapRef.current?.removeLayer(markerLayer);
    };
  }, [mapRef, offers, activeOfferId]);

  return (
    <section className={clsx('map', className)}>
      <div ref={mapElementRef} style={{ 'height': '100%' }} ></div>
    </section>
  );
}

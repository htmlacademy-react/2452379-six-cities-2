import { renderHook } from '@testing-library/react';
import React from 'react';
import useMap from './useMap';
import { MapData } from '../types/common';
import leaflet from 'leaflet';
import { describe, it, expect, vi } from 'vitest';

describe('useMap hook', () => {
  const mapElement = document.createElement('div');
  const mapElementRef: React.RefObject<HTMLDivElement> = { current: mapElement };
  const location: MapData = {
    latitude: 51.505,
    longitude: -0.09,
    zoom: 13,
  };

  it('should initialize the map correctly', () => {
    const mapMock: Partial<leaflet.Map> = {
      setView: vi.fn().mockReturnThis(),
    };
    const tileLayerMock: Partial<leaflet.TileLayer> = {
      addTo: vi.fn(),
    };

    vi.spyOn(leaflet, 'map').mockReturnValue(mapMock as leaflet.Map);
    vi.spyOn(leaflet, 'tileLayer').mockReturnValue(tileLayerMock as leaflet.TileLayer);

    renderHook(() => useMap(mapElementRef, location));

    expect(leaflet.map).toHaveBeenCalledWith(mapElement, undefined);
    expect(mapMock.setView).toHaveBeenCalledWith(
      { lat: location.latitude, lng: location.longitude },
      location.zoom
    );
  });

  it('should use provided options', () => {
    const options: leaflet.MapOptions = { zoomControl: false };

    renderHook(() => useMap(mapElementRef, location, options));

    expect(leaflet.map).toHaveBeenCalledWith(mapElement, options);
  });
});

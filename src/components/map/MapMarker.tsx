import React from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';

interface MapMarkerProps {
  position: [number, number];
  type: 'comercio' | 'evento' | 'estacionamento';
  children?: React.ReactNode;
}

export function MapMarker({ position, type, children }: MapMarkerProps) {
  // We can create custom icons based on the type later, for now we use color-coded simple icons or default.
  let markerColor = 'blue';
  if (type === 'evento') markerColor = 'purple';
  if (type === 'estacionamento') markerColor = 'green';

  const customIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${markerColor}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });

  return (
    <Marker position={position} icon={customIcon}>
      {children}
    </Marker>
  );
}
import React from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';

interface MapMarkerProps {
  position: [number, number];
  type: 'comercio' | 'evento' | 'estacionamento' | 'pontoTuristico';
  children?: React.ReactNode;
  onClick?: () => void;
  openPopup?: boolean;
}

export function MapMarker({ position, type, children, onClick, openPopup }: MapMarkerProps) {
  let markerColor = '#1a73e8';
  let markerLabel = '';
  let markerBorder = '2px solid white';
  let markerShadow = '0 2px 4px rgba(0,0,0,0.3)';

  if (type === 'evento') {
    markerColor = '#9333ea';
  }

  if (type === 'estacionamento') {
    markerColor = '#16a34a';
    markerLabel = 'P';
    markerBorder = '2px solid #dcfce7';
    markerShadow = '0 4px 10px rgba(22,163,74,0.35)';
  }

  if (type === 'pontoTuristico') {
    markerColor = '#f97316';
    markerLabel = 'T';
    markerBorder = '2px solid #fff7ed';
    markerShadow = '0 4px 10px rgba(249,115,22,0.25)';
  }

  const customIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="display:flex; align-items:center; justify-content:center; background-color: ${markerColor}; width: 28px; height: 28px; border-radius: 9999px; border: ${markerBorder}; box-shadow: ${markerShadow}; color: white; font-size: 13px; font-weight: 800; line-height: 1;">${markerLabel}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });

  const markerRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (openPopup && markerRef.current && typeof markerRef.current.openPopup === 'function') {
      try {
        markerRef.current.openPopup();
      } catch (e) {
        // ignore
      }
    }
  }, [openPopup]);

  return (
    <Marker
      ref={markerRef}
      position={position}
      icon={customIcon}
      {...(onClick ? { eventHandlers: { click: onClick } } : {})}
    >
      {children}
    </Marker>
  );
}
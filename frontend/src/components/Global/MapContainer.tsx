import { useEffect, type ReactNode } from 'react';
import { MapContainer as LeafletMapContainer, TileLayer, useMap, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapContainerProps {
  children: ReactNode;
  center?: [number, number];
  zoom?: number;
  className?: string;
}

function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export function MapContainer({ children, center = [-10.910490, -37.050337], zoom = 18, className = "w-full h-full" }: MapContainerProps) {
  return (
    <div className={className} style={{ height: '100%', width: '100%', minHeight: '400px', position: 'relative' }}>
      <LeafletMapContainer
        center={center}
        zoom={zoom}
        zoomControl={true}
        maxZoom={21}
        style={{ height: '100%', width: '100%' }}
      >
        <ChangeView center={center} zoom={zoom} />
        
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Ruas (Google)">
            <TileLayer
              attribution='&copy; Google'
              url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
              maxZoom={21}
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Híbrido (Google Satélite)">
            <TileLayer
              attribution='&copy; Google'
              url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
              maxZoom={21}
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Terreno (Google)">
            <TileLayer
              attribution='&copy; Google'
              url="https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
              maxZoom={21}
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Satélite Realista (Esri)">
            <TileLayer
              attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              maxZoom={19}
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {children}
      </LeafletMapContainer>
    </div>
  );
}
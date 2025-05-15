// src/components/UI/MapCard.tsx
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { DerrameCoords } from "../../types/simulacro";

const centerZoom = [37.3876, -5.9924]; // Centro aproximado de Andalucía
const zoom = 8;

const ClickableMarker = ({
  onSelect,
}: {
  onSelect: (coords: DerrameCoords) => void;
}) => {
  const [marker, setMarker] = useState<DerrameCoords | null>(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setMarker({ lat, lng });
      onSelect({ lat, lng });
    },
  });

  return marker ? <Marker position={[marker.lat, marker.lng]} /> : null;
};

const MapCard: React.FC<{
  coords: DerrameCoords | null;
  onCoordsChange: (coords: DerrameCoords) => void;
}> = ({ coords, onCoordsChange }) => {
  return (
    <div className="card card-max card-centered map-card-outer">
      <h3>Haz clic en el mapa para seleccionar la ubicación del derrame</h3>
      <MapContainer
        center={coords ? [coords.lat, coords.lng] : centerZoom}
        zoom={zoom}
        className="sim-map-container"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickableMarker onSelect={onCoordsChange} />
        {coords && <Marker position={[coords.lat, coords.lng]} />}
      </MapContainer>
      {coords && (
        <div className="mt-1">
          <b>Coordenadas seleccionadas:</b> {coords.lat.toFixed(5)},{" "}
          {coords.lng.toFixed(5)}
        </div>
      )}
    </div>
  );
};

export default MapCard;

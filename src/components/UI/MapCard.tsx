// src/components/UI/MapCard.tsx
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { DerrameCoords } from "../../types/simulacro";
import { LeafletMouseEvent } from "leaflet"; // Importación explícita para tipado
import L from "leaflet";

// Icono personalizado para evitar errores de 404
const markerIcon = L.icon({
  iconUrl: "/leaflet/marker-icon.png",
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  shadowUrl: "/leaflet/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const centerZoom: [number, number] = [37.3876, -5.9924]; // Centro aproximado de Andalucía
const zoom = 8;

// Componente para seleccionar coordenadas en modo interactivo
const ClickableMarker = ({
  onSelect,
}: {
  onSelect?: (coords: DerrameCoords) => void;
}) => {
  const [marker, setMarker] = useState<DerrameCoords | null>(null);

  useMapEvents({
    click(e: LeafletMouseEvent) {
      if (!onSelect) return;
      const { lat, lng } = e.latlng;
      setMarker({ lat, lng });
      onSelect({ lat, lng });
    },
  });

  return marker ? (
    <Marker position={[marker.lat, marker.lng]} icon={markerIcon} />
  ) : null;
};

/**
 * MapCard
 * Muestra un mapa con marcador fijo o permite seleccionar coordenadas si onCoordsChange está presente.
 * Trazabilidad: onCoordsChange es opcional para permitir modo solo visual (ver CopilotGuidelines.json, minimalismo y robustez).
 */
const MapCard: React.FC<{
  coords: DerrameCoords | null;
  onCoordsChange?: (coords: DerrameCoords) => void;
}> = ({ coords, onCoordsChange }) => {
  return (
    <div className="card card-max card-centered map-card-outer">
      {onCoordsChange && (
        <h3>Haz clic en el mapa para seleccionar la ubicación del derrame</h3>
      )}
      <MapContainer
        center={coords ? [coords.lat, coords.lng] : centerZoom}
        zoom={zoom}
        className="sim-map-container"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {onCoordsChange ? (
          <ClickableMarker onSelect={onCoordsChange} />
        ) : coords ? (
          <Marker position={[coords.lat, coords.lng]} icon={markerIcon} />
        ) : null}
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

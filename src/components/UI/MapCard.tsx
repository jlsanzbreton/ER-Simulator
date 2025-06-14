// src/components/UI/MapCard.tsx
import React, { useState, useEffect } from "react"; // Added useEffect
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { DerrameCoords } from "../../types/simulacro";
import { LeafletMouseEvent } from "leaflet";
import L from "leaflet";
import { useRouter } from "next/router";

// Function to create a dynamic marker icon with basePath
const createMarkerIcon = (basePath: string) => {
  if (typeof window === "undefined") return undefined;
  return L.icon({
    iconUrl: `${basePath}/leaflet/marker-icon.png`,
    iconRetinaUrl: `${basePath}/leaflet/marker-icon-2x.png`,
    shadowUrl: `${basePath}/leaflet/marker-shadow.png`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

const centerZoom: [number, number] = [37.3876, -5.9924];
const zoom = 8;

const ClickableMarker = ({
  onSelect,
  icon, // Added icon prop
}: {
  onSelect?: (coords: DerrameCoords) => void;
  icon: L.Icon | L.DivIcon | undefined; // Added icon prop type
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
    icon ? (
      <Marker position={[marker.lat, marker.lng]} icon={icon} />
    ) : null
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
  const router = useRouter();
  const [currentMarkerIcon, setCurrentMarkerIcon] = useState<L.Icon | L.DivIcon | undefined>(undefined);

  useEffect(() => {
    setCurrentMarkerIcon(createMarkerIcon(router.basePath));
  }, [router.basePath]);

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
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {onCoordsChange ? (
          currentMarkerIcon ? (
            <ClickableMarker onSelect={onCoordsChange} icon={currentMarkerIcon} />
          ) : null
        ) : coords && currentMarkerIcon ? (
          <Marker position={[coords.lat, coords.lng]} icon={currentMarkerIcon} />
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

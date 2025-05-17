// src/components/UI/SimMap.tsx
// Mapa persistente y dinámico para la simulación
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Circle, Marker, GeoJSON } from "react-leaflet";
import {
  DerrameCoords,
  SimulacroCondicionesAmbientales,
} from "../../types/simulacro";
import { FeatureCollection } from "geojson";

interface SimMapProps {
  coords: DerrameCoords;
  condiciones: SimulacroCondicionesAmbientales;
  fase: string;
}

// MVP: desplazamiento simple según dirección del viento y fase
const desplazamientoPorDireccion: Record<string, [number, number]> = {
  N: [0.001, 0],
  NE: [0.0007, 0.0007],
  E: [0, 0.001],
  SE: [-0.0007, 0.0007],
  S: [-0.001, 0],
  SO: [-0.0007, -0.0007],
  O: [0, -0.001],
  NO: [0.0007, -0.0007],
};

// Puedes sustituir esta URL por un GeoJSON local o más detallado si lo prefieres
const ANDALUCIA_COAST_GEOJSON_URL =
  "https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries/ESP.geojson";

const SimMap: React.FC<SimMapProps> = ({ coords, condiciones, fase }) => {
  const [mancha, setMancha] = useState<DerrameCoords>(coords);
  const [radio, setRadio] = useState(350); // metros
  const [coastData, setCoastData] = useState<FeatureCollection | null>(null);

  // Cargar la costa de Andalucía (GeoJSON)
  useEffect(() => {
    fetch(ANDALUCIA_COAST_GEOJSON_URL)
      .then((res) => res.json())
      .then((data) => setCoastData(data));
  }, []);

  // Simula el movimiento de la mancha al cambiar de fase
  useEffect(() => {
    if (!condiciones) return;
    const dir = condiciones.viento.direccion;
    const [dLat, dLng] = desplazamientoPorDireccion[dir] || [0, 0];
    setMancha((prev) => ({
      lat: prev.lat + dLat * condiciones.viento.fuerza * 0.1,
      lng: prev.lng + dLng * condiciones.viento.fuerza * 0.1,
    }));
    setRadio((r) => r + 50); // la mancha crece un poco cada fase
  }, [fase, condiciones]);

  return (
    <div className="card card-max card-centered map-card-outer mb-2">
      <MapContainer
        center={[mancha.lat, mancha.lng]}
        zoom={8}
        className="sim-map-container"
        scrollWheelZoom={false}
        dragging={false}
        doubleClickZoom={false}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* Capa de costa de Andalucía */}
        {coastData && (
          <GeoJSON
            data={coastData}
            style={{
              color: "#388e3c",
              weight: 2,
              fillOpacity: 0.1,
            }}
          />
        )}
        <Circle
          center={[mancha.lat, mancha.lng]}
          radius={radio}
          pathOptions={{
            color: "#0277bd",
            fillColor: "#0277bd",
            fillOpacity: 0.35,
          }}
        />
        <Marker position={[coords.lat, coords.lng]} />
      </MapContainer>
      <div className="mt-1 role-desc text-center">
        Mancha simulada (evoluciona según viento y fase)
      </div>
    </div>
  );
};

export default SimMap;

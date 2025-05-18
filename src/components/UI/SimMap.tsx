// src/components/UI/SimMap.tsx
// Mapa persistente y dinámico para la simulación
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Circle,
  Marker,
  useMap,
  Polyline,
} from "react-leaflet";
import {
  DerrameCoords,
  SimulacroCondicionesAmbientales,
} from "../../types/simulacro";
import { FeatureCollection } from "geojson";
import L from "leaflet";
import { getCoastlineCoords } from "@/utils/extractCoastline";

const markerIcon =
  typeof window !== "undefined"
    ? L.icon({
        iconUrl: "/leaflet/marker-icon.png",
        iconRetinaUrl: "/leaflet/marker-icon-2x.png",
        shadowUrl: "/leaflet/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      })
    : undefined;

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
const ANDALUCIA_COAST_GEOJSON_URL = "/geojson/andalucia-v2.geojson";

// Cargar el GeoJSON de la costa de Andalucía de forma asíncrona y segura
// y mostrar la línea de costa extraída como Polyline roja para validación
const SimMap: React.FC<SimMapProps> = ({ coords, condiciones, fase }) => {
  const [mancha, setMancha] = useState<DerrameCoords>(coords);
  const [radio, setRadio] = useState(350); // metros
  const [coastData, setCoastData] = useState<FeatureCollection | null>(null);

  // Historial de posiciones para rastro visual (opcional, MVP)
  const [historial, setHistorial] = useState<DerrameCoords[]>([]);

  // Cargar la costa de Andalucía (GeoJSON) de forma segura
  useEffect(() => {
    fetch(ANDALUCIA_COAST_GEOJSON_URL)
      .then((res) => {
        if (!res.ok) throw new Error("GeoJSON fetch failed");
        return res.json();
      })
      .then((data) => setCoastData(data))
      .catch((err) => {
        console.error("Error loading GeoJSON:", err);
      });
  }, []);

  // Simula el movimiento de la mancha al cambiar de fase
  useEffect(() => {
    if (!condiciones) return;
    const dir = condiciones.viento.direccion;
    const [dLat, dLng] = desplazamientoPorDireccion[dir] || [0, 0];
    setMancha((prev) => {
      const nueva = {
        lat: prev.lat + dLat * condiciones.viento.fuerza * 0.1,
        lng: prev.lng + dLng * condiciones.viento.fuerza * 0.1,
      };
      setHistorial((h) => [...h, nueva]);
      return nueva;
    });
    setRadio((r) => r + 50); // la mancha crece un poco cada fase
  }, [fase, condiciones]);

  // Animación suave de la mancha (transición de posición y radio)
  useEffect(() => {
    let anim: number;
    let frame = 0;
    const steps = 20;
    const start = mancha;
    const end = historial.length > 0 ? historial[historial.length - 1] : mancha;
    if (start.lat !== end.lat || start.lng !== end.lng) {
      const animate = () => {
        frame++;
        const t = frame / steps;
        setMancha({
          lat: start.lat + (end.lat - start.lat) * t,
          lng: start.lng + (end.lng - start.lng) * t,
        });
        if (frame < steps) anim = requestAnimationFrame(animate);
      };
      animate();
    }
    return () => cancelAnimationFrame(anim);
  }, [historial, mancha]);

  // Hook para centrar y ajustar el zoom dinámicamente
  function DynamicMapView({
    center,
    radio,
  }: {
    center: [number, number];
    radio: number;
  }) {
    const map = useMap();
    useEffect(() => {
      let zoom = 12.5; // zoom por defecto
      if (radio > 1200) zoom = 11.5;
      if (radio > 2500) zoom = 10.5;
      if (radio > 4000) zoom = 9.5;
      if (radio > 6000) zoom = 8.5;
      if (radio > 8000) zoom = 7.5;
      if (radio > 10000) zoom = 6.5;
      if (radio > 12000) zoom = 5.5;
      map.setView(center, zoom, { animate: true });
    }, [center, radio, map]);
    return null;
  }

  // Visualización de la línea de costa extraída para validación
  const coastlineCoords = coastData ? getCoastlineCoords(coastData) : null;

  return (
    <div className="card card-max card-centered map-card-outer mb-2">
      <MapContainer
        center={[mancha.lat, mancha.lng]}
        zoom={14}
        className="sim-map-container"
        scrollWheelZoom={false}
        dragging={false}
        doubleClickZoom={false}
        zoomControl={false}
        attributionControl={false}
      >
        <DynamicMapView center={[mancha.lat, mancha.lng]} radio={radio} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* LÍNEA DE COSTA EXTRAÍDA (VALIDACIÓN) */}
        {coastlineCoords && coastlineCoords.length > 1 && (
          <Polyline
            positions={coastlineCoords.map(([lng, lat]) => [lat, lng])}
            pathOptions={{ color: "#e53935", weight: 2, opacity: 0.5 }}
          />
        )}
        {/* Mancha con gradiente visual (círculos concéntricos y resplandor animado) */}
        <Circle
          center={[mancha.lat, mancha.lng]}
          radius={radio * 1.7}
          pathOptions={{
            color: undefined,
            fillColor: "#0277bd",
            fillOpacity: 0.07,
          }}
          className="mancha-glow"
        />
        <Circle
          center={[mancha.lat, mancha.lng]}
          radius={radio * 1.4}
          pathOptions={{
            color: undefined,
            fillColor: "#0277bd",
            fillOpacity: 0.13,
          }}
        />
        <Circle
          center={[mancha.lat, mancha.lng]}
          radius={radio * 1.15}
          pathOptions={{
            color: undefined,
            fillColor: "#0277bd",
            fillOpacity: 0.18,
          }}
        />
        <Circle
          center={[mancha.lat, mancha.lng]}
          radius={radio}
          pathOptions={{
            color: "#0277bd",
            fillColor: "#0277bd",
            fillOpacity: 0.35,
          }}
        />
        {/* Rastro de la mancha (opcional, MVP) */}
        {historial.slice(-5, -1).map((pos, i) => (
          <Circle
            key={i}
            center={[pos.lat, pos.lng]}
            radius={radio * 0.7}
            pathOptions={{
              color: undefined,
              fillColor: "#81d4fa",
              fillOpacity: 0.1,
            }}
          />
        ))}
        {markerIcon && <Marker position={coords} icon={markerIcon} />}
      </MapContainer>
    </div>
  );
};

export default SimMap;

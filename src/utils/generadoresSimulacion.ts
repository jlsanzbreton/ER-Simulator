// src/utils/generadoresSimulacion.ts
import type { FeatureCollection, LineString, Feature } from "geojson";
import { DerrameCoords, RolInfo } from "../types/simulacro";
import * as turf from "@turf/turf";
import { ModoSimulador } from "../types/dualidad";
import { ROLES_INFO } from "./rolesData";

// Listas de roles válidos por modo
const ROLES_ENTRENAMIENTO = [
  "CAPITAN_BARCO_A",
  "CAPITAN_BARCO_B",
  "ARMADOR_A",
  "ARMADOR_B",
  "FLETADOR_A",
  "FLETADOR_B",
  "TERMINAL_MOEVE",
  "GABINETE_FABRICA",
  "GABINETE_TRADING",
  "CAPITANIA",
  "PECLA",
  "EMERGENCIAS_112",
] as const;
const ROLES_SIMULACRO = [
  "ORGANIZADOR",
  "OBSERVADOR",
  "LIDER_SIMULACRO",
] as const;

// Generador de rol aleatorio según modo
export function generarRolAleatorio(modo: ModoSimulador): RolInfo {
  const roles =
    modo === "entrenamiento"
      ? ROLES_INFO.filter((r: RolInfo) =>
          ROLES_ENTRENAMIENTO.includes(
            r.code as (typeof ROLES_ENTRENAMIENTO)[number]
          )
        )
      : ROLES_INFO.filter((r: RolInfo) =>
          ROLES_SIMULACRO.includes(r.code as (typeof ROLES_SIMULACRO)[number])
        );
  return roles[Math.floor(Math.random() * roles.length)];
}

// Generador de coordenadas válidas en el mar, cerca de la costa andaluza
export function generarCoordenadasValidas(
  geojson: FeatureCollection
): DerrameCoords {
  // 1. Extraer la LineString de la costa principal
  const feature = geojson.features.find(
    (f): f is Feature<LineString> =>
      f.geometry.type === "LineString" &&
      (f.properties?.name === "Línea de Costa Principal de Andalucía" ||
        f.properties?.layer === "coastline")
  );
  if (!feature) throw new Error("No se encontró la línea de costa principal");
  const line = turf.lineString(feature.geometry.coordinates);
  const lineLength = turf.length(line, { units: "kilometers" });

  // 2. Elegir una distancia aleatoria sobre la línea
  const randomDist = Math.random() * lineLength;
  const puntoCosta = turf.along(line, randomDist, { units: "kilometers" });

  // 3. Calcular el segmento local para obtener la dirección perpendicular
  let minDist = Infinity;
  let closestSegment: [number, number][] = [
    feature.geometry.coordinates[0].slice(0, 2) as [number, number],
    feature.geometry.coordinates[1].slice(0, 2) as [number, number],
  ];
  for (let i = 0; i < feature.geometry.coordinates.length - 1; i++) {
    const seg: [number, number][] = [
      feature.geometry.coordinates[i].slice(0, 2) as [number, number],
      feature.geometry.coordinates[i + 1].slice(0, 2) as [number, number],
    ];
    const segLine = turf.lineString(seg);
    const dist = turf.pointToLineDistance(puntoCosta, segLine, {
      units: "kilometers",
    });
    if (dist < minDist) {
      minDist = dist;
      closestSegment = seg;
    }
  }
  // 4. Calcular el bearing del segmento y el perpendicular (hacia el mar)
  const bearing = turf.bearing(
    turf.point(closestSegment[0]),
    turf.point(closestSegment[1])
  );
  const maxDistKm = 5;
  // Intentar hasta 10 veces para evitar puntos "en tierra" en zonas complejas
  for (let intento = 0; intento < 10; intento++) {
    const distKm = Math.random() * maxDistKm;
    const perp1 = turf.destination(puntoCosta, distKm, bearing + 90, {
      units: "kilometers",
    });
    const perp2 = turf.destination(puntoCosta, distKm, bearing - 90, {
      units: "kilometers",
    });
    // Elegimos el que esté más lejos de la línea de costa
    const dist1 = turf.pointToLineDistance(perp1, line, {
      units: "kilometers",
    });
    const dist2 = turf.pointToLineDistance(perp2, line, {
      units: "kilometers",
    });
    const candidato = dist1 > dist2 ? perp1 : perp2;
    // Comprobación robusta: el punto no debe estar "sobre" la línea ni cruzarla
    // ni estar en tierra (buffer negativo)
    // Usamos un pequeño buffer negativo para evitar puntos en tierra en zonas de entrantes
    const buffer = turf.buffer(line, 0.01, { units: "kilometers" }); // ~10m
    if (buffer && buffer.geometry.type === "Polygon") {
      if (!turf.booleanPointInPolygon(candidato, buffer)) {
        const [lng, lat] = candidato.geometry.coordinates;
        return { lat, lng };
      }
    } else if (buffer && buffer.geometry.type === "MultiPolygon") {
      if (!turf.booleanPointInPolygon(candidato, buffer)) {
        const [lng, lat] = candidato.geometry.coordinates;
        return { lat, lng };
      }
    }
  }
  // Si tras 10 intentos no se encuentra, devolver el último (menos robusto)
  const [lng, lat] = turf.destination(puntoCosta, maxDistKm, bearing + 90, {
    units: "kilometers",
  }).geometry.coordinates;
  return { lat, lng };
}

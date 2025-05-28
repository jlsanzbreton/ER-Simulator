// src/utils/generadoresSimulacion.ts
import type { FeatureCollection, LineString, Feature, Point } from "geojson";
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
  const coastlineFeature = geojson.features.find(
    (f): f is Feature<LineString> =>
      f.geometry.type === "LineString" &&
      (f.properties?.name === "Línea de Costa Principal de Andalucía" ||
        f.properties?.layer === "coastline")
  );

  if (!coastlineFeature) {
    console.error(
      "Error: No se encontró la 'Línea de Costa Principal de Andalucía' en el archivo GeoJSON. Verifique que la propiedad 'name' o 'layer' sea correcta. GeoJSON recibido:",
      JSON.stringify(geojson, null, 2)
    );
    throw new Error(
      "No se encontró la línea de costa principal en el GeoJSON proporcionado."
    );
  }
  const coastline = turf.lineString(coastlineFeature.geometry.coordinates);
  const coastlineLength = turf.length(coastline, { units: "kilometers" });

  const MAX_DIST_KM = 1; // Máximo 1 km de la costa
  const MIN_DIST_KM = 0.05; // Mínimo 50m de la costa
  const MAX_ATTEMPTS = 30; // Aumentar intentos para condiciones más estrictas

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const randomDistOnCoast = Math.random() * coastlineLength;
    const pointOnCoast = turf.along(coastline, randomDistOnCoast, {
      units: "kilometers",
    });

    let closestSegmentIndex = -1;
    let minPerpendicularDist = Infinity;

    // Encontrar el segmento de la línea de costa más cercano al pointOnCoast
    // para obtener una orientación local precisa.
    for (let i = 0; i < coastlineFeature.geometry.coordinates.length - 1; i++) {
      const segment = turf.lineString([
        coastlineFeature.geometry.coordinates[i],
        coastlineFeature.geometry.coordinates[i + 1],
      ]);
      // Distancia desde pointOnCoast al segmento actual
      const dist = turf.pointToLineDistance(pointOnCoast, segment, {
        units: "kilometers",
      });
      if (dist < minPerpendicularDist) {
        minPerpendicularDist = dist;
        closestSegmentIndex = i;
      }
    }

    if (closestSegmentIndex === -1) {
      // Esto no debería ocurrir si la línea de costa tiene al menos un segmento
      if (coastlineFeature.geometry.coordinates.length >= 2) {
        closestSegmentIndex = 0; // Fallback al primer segmento
      } else {
        console.error(
          "Línea de costa con insuficientes puntos:",
          coastlineFeature
        );
        throw new Error(
          "Línea de costa con muy pocos puntos para determinar segmento."
        );
      }
    }

    const segmentStart = turf.point(
      coastlineFeature.geometry.coordinates[closestSegmentIndex]
    );
    const segmentEnd = turf.point(
      coastlineFeature.geometry.coordinates[closestSegmentIndex + 1]
    );
    const segmentBearing = turf.bearing(segmentStart, segmentEnd);

    const spillDistance =
      Math.random() * (MAX_DIST_KM - MIN_DIST_KM) + MIN_DIST_KM;

    const candidateSpillPoints: Feature<Point>[] = [];
    const perpendicularBearings = [segmentBearing + 90, segmentBearing - 90];

    for (const bearing of perpendicularBearings) {
      candidateSpillPoints.push(
        turf.destination(pointOnCoast, spillDistance, bearing, {
          units: "kilometers",
        })
      );
    }

    // Ordenar candidatos: preferir puntos más alejados de TODA la línea de costa.
    // Ayuda a seleccionar el punto más "mar adentro" en bahías.
    candidateSpillPoints.sort((a, b) => {
      const distA = turf.pointToLineDistance(a, coastline, {
        units: "kilometers",
      });
      const distB = turf.pointToLineDistance(b, coastline, {
        units: "kilometers",
      });
      return distB - distA; // Orden descendente por distancia
    });

    for (const candidate of candidateSpillPoints) {
      // Check A: El punto no debe estar demasiado cerca o sobre la línea de costa (dentro de un pequeño buffer).
      const coastLineBuffer = turf.buffer(coastline, 0.01, {
        units: "kilometers",
      }); // buffer de 10m

      // FIX: Ensure coastLineBuffer exists before trying to use it.
      if (!coastLineBuffer) {
        // console.warn("generarCoordenadasValidas: No se pudo crear el buffer de la línea de costa para el candidato. Omitiendo candidato.");
        continue; // Skip this candidate if buffer creation fails
      }

      let isTooCloseOrOnLand = false;
      // Now it's safe to access coastLineBuffer.geometry
      if (
        coastLineBuffer.geometry.type === "Polygon" ||
        coastLineBuffer.geometry.type === "MultiPolygon"
      ) {
        isTooCloseOrOnLand = turf.booleanPointInPolygon(
          candidate,
          coastLineBuffer
        );
      }

      if (isTooCloseOrOnLand) {
        continue; // Probar siguiente candidato
      }

      // Check B: La línea recta desde pointOnCoast hasta candidate no debe cruzar otras partes de la coastline.
      const lineToSpill = turf.lineString([
        pointOnCoast.geometry.coordinates,
        candidate.geometry.coordinates,
      ]);
      const intersections = turf.lineIntersect(lineToSpill, coastline);

      let intersectsOtherPartOfCoast = false;
      if (intersections.features.length > 0) {
        for (const intersectFeat of intersections.features) {
          const distToPointOnCoast = turf.distance(
            intersectFeat.geometry,
            pointOnCoast.geometry,
            { units: "kilometers" }
          );
          // Si un punto de intersección NO es (prácticamente) el pointOnCoast, entonces cruza otra parte.
          if (distToPointOnCoast > 0.001) {
            // Tolerancia de 1 metro
            intersectsOtherPartOfCoast = true;
            break;
          }
        }
      }

      if (intersectsOtherPartOfCoast) {
        continue; // Probar siguiente candidato
      }

      // Si todos los checks pasan
      const [lng, lat] = candidate.geometry.coordinates;
      if (!isNaN(lat) && !isNaN(lng)) {
        return { lat, lng };
      }
    }
  }

  console.warn(
    `generarCoordenadasValidas: No se pudo encontrar un punto ideal después de ${MAX_ATTEMPTS} intentos. Usando un fallback simple.`
  );
  const fallbackPointOnCoast = turf.along(
    coastline,
    Math.random() * coastlineLength,
    { units: "kilometers" }
  );
  const fallbackBearing =
    coastlineFeature.geometry.coordinates.length >= 2
      ? turf.bearing(
          turf.point(coastlineFeature.geometry.coordinates[0]),
          turf.point(coastlineFeature.geometry.coordinates[1])
        )
      : 0;
  const fallbackSpillPoint = turf.destination(
    fallbackPointOnCoast,
    MIN_DIST_KM + (MAX_DIST_KM - MIN_DIST_KM) / 2, // Distancia media
    fallbackBearing + 90, // Una dirección perpendicular
    { units: "kilometers" }
  );
  const [lng, lat] = fallbackSpillPoint.geometry.coordinates;

  if (!isNaN(lat) && !isNaN(lng)) {
    return { lat, lng };
  } else {
    // Último recurso absoluto
    console.error(
      "generarCoordenadasValidas: Fallback generó NaN. Devolviendo coordenadas fijas de emergencia."
    );
    return { lat: 36.5, lng: -6.0 }; // Coordenadas fijas de ejemplo en el mar
  }
}

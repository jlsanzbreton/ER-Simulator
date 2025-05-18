// Utilidad para extraer la línea de costa del GeoJSON de Andalucía
// Permite obtener la polilínea de la costa para cálculos de colisión y visualización

import type { FeatureCollection, LineString } from "geojson";

/**
 * Extrae la línea de costa del archivo GeoJSON dado.
 * @param geojson El objeto GeoJSON cargado (FeatureCollection)
 * @returns Array de coordenadas [lng, lat] de la línea de costa, o null si no se encuentra
 */
export function getCoastlineCoords(
  geojson: FeatureCollection
): [number, number][] | null {
  const coastFeature = geojson.features.find(
    (f) =>
      f.geometry.type === "LineString" &&
      (f.properties?.layer === "costa" || f.properties?.layer === "coastline")
  ) as { geometry: LineString } | undefined;
  if (!coastFeature) return null;
  return coastFeature.geometry.coordinates.map(
    (coord) => [coord[0], coord[1]] as [number, number]
  );
}

// Ejemplo de uso:
// import geojson from 'public/geojson/andalucia-v2.geojson';
// const coords = getCoastlineCoords(geojson);
// coords => [[lng, lat], ...]

// NOTA: Para producción, cargar el GeoJSON de forma asíncrona y cachear el resultado.

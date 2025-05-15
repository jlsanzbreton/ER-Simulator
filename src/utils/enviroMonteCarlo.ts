// Lógica de generación ambiental aleatoria
import { SimulacroCondicionesAmbientales } from "../types/simulacro";

const DIRECCIONES_VIENTO = [
  "N",
  "NE",
  "E",
  "SE",
  "S",
  "SO",
  "O",
  "NO",
] as const;
const PRECIPITACIONES = [
  "NINGUNA",
  "LLUVIA_LIGERA",
  "LLUVIA_INTENSA",
  "TORMENTA",
  "CALIMA",
] as const;
const MAREAS = ["ALTA", "BAJA", "PLEAMAR", "BAJAMAR"] as const;

function randomFromArray<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generarCondicionesAmbientales(): SimulacroCondicionesAmbientales {
  const hora = `${String(7 + Math.floor(Math.random() * 10)).padStart(
    2,
    "0"
  )}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`;
  const marea = randomFromArray(MAREAS);
  const viento = {
    direccion: randomFromArray(DIRECCIONES_VIENTO),
    fuerza: 5 + Math.floor(Math.random() * 26), // de 5 a 30 nudos
  };
  const precipitacion = randomFromArray(PRECIPITACIONES);
  const temperatura = 12 + Math.floor(Math.random() * 18); // 12º a 29ºC

  // Resumen realista
  const resumen = `Hora: ${hora}, Marea: ${marea}, Viento: ${
    viento.fuerza
  } nudos (${viento.direccion}), ${
    precipitacion === "NINGUNA"
      ? "Sin precipitación"
      : precipitacion === "CALIMA"
      ? "Calima en el aire"
      : "Precipitación: " + precipitacion.toLowerCase()
  }, ${temperatura}ºC.`;

  return {
    hora,
    marea,
    viento,
    precipitacion,
    temperatura,
    resumen,
  };
}

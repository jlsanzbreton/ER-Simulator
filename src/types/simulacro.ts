// Definiciones de tipos para el simulacro// /src/types/simulacro.ts

export type RolSimulacro =
  | "CAPITAN_BARCO_A"
  | "CAPITAN_BARCO_B"
  | "ARMADOR_A"
  | "ARMADOR_B"
  | "FLETADOR_A"
  | "FLETADOR_B"
  | "TERMINAL_MOEVE"
  | "GABINETE_FABRICA"
  | "GABINETE_TRADING"
  | "CAPITANIA"
  | "PECLA"
  | "EMERGENCIAS_112";

export interface RolInfo {
  id: number;
  code: RolSimulacro;
  displayName: string;
  description: string;
  icon?: string;
}

export interface SimulacroCondicionesAmbientales {
  hora: string; // HH:mm
  marea: "ALTA" | "BAJA" | "PLEAMAR" | "BAJAMAR";
  viento: {
    direccion: "N" | "NE" | "E" | "SE" | "S" | "SO" | "O" | "NO";
    fuerza: number;
  };
  precipitacion:
    | "NINGUNA"
    | "LLUVIA_LIGERA"
    | "LLUVIA_INTENSA"
    | "TORMENTA"
    | "CALIMA";
  temperatura: number;
  resumen: string;
}

export interface SimulacroState {
  rolSeleccionado?: RolSimulacro;
  condiciones?: SimulacroCondicionesAmbientales;
}

// Para RoleSelector
export interface RoleSelectorProps {
  roles: RolInfo[];
  onSelect: (rol: RolSimulacro) => void;
}
export interface FaseSimulacroProps {
  fase: string;
  rol: RolSimulacro;
  condiciones: SimulacroCondicionesAmbientales;
  onDecision: (fase: string, decision: string, feedback: string) => void;
  isBlocked?: boolean;
}
// Para RoleSelector
export interface RoleSelectorProps {
  roles: RolInfo[];
  onSelect: (rol: RolSimulacro) => void;
}

// Para EnviroGenerator
export interface EnviroGeneratorProps {
  onGenerated: (condiciones: SimulacroCondicionesAmbientales) => void;
}

// Para SimulacionMain
export interface SimulacionMainProps {
  rol: RolSimulacro;
  condiciones: SimulacroCondicionesAmbientales;
}
// Coordenadas geográficas simples (latitud/longitud)
export interface DerrameCoords {
  lat: number;
  lng: number;
}
// Coordenadas geográficas con precisión
export interface PreciseCoords {
  lat: number;
  lng: number;
  precision: number; // Precisión en metros
}
// Información sobre el derrame
export interface DerrameInfo {
  tipo: string; // Tipo de derrame (petróleo, químico, etc.)
  volumen: number; // Volumen del derrame en litros
  coords: DerrameCoords; // Coordenadas del derrame
  fecha: Date; // Fecha y hora del derrame
  condiciones: SimulacroCondicionesAmbientales; // Condiciones ambientales en el momento del derrame
  impacto: string; // Descripción del impacto ambiental
  respuesta: string; // Descripción de la respuesta al derrame
  medidas: string; // Medidas de mitigación
  seguimiento: string; // Descripción del seguimiento del derrame
  lecciones: string; // Lecciones aprendidas
  recomendaciones: string; // Recomendaciones para el futuro
  // Información adicional
  [key: string]: any; // Permite agregar información adicional
}
// Información sobre el simulacro
export interface SimulacroInfo {
  id: string; // ID único del simulacro
  fecha: Date; // Fecha y hora del simulacro
  rol: RolSimulacro; // Rol del participante
  condiciones: SimulacroCondicionesAmbientales; // Condiciones ambientales del simulacro
  derrames: DerrameInfo[]; // Lista de derrames simulados
  resultados: {
    [key: string]: any; // Resultados del simulacro
  };
  feedback: string; // Feedback del simulacro
  // Información adicional
  [key: string]: any; // Permite agregar información adicional
}

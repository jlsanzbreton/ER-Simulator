// src/types/checks.ts
// Estructura de checks de cumplimiento y log para simulacros reales
// Trazabilidad: ver CopilotGuidelines.json, DrillGuide.json

export interface SimulacroCheck {
  id: string; // ID único del check
  descripcion: string; // Descripción del hito/acción
  fase: string; // Fase del simulacro (detección, notificación, etc.)
  obligatorio: boolean; // Si es obligatorio según normativa
  marcadoPor?: string; // Usuario/rol que lo marcó
  horaMarcado?: string; // Fecha/hora ISO
  observaciones?: string; // Comentario opcional del observador
}

export type SimulacroChecksLog = SimulacroCheck[];

// Nueva estructura para anotaciones por fase
export interface AnotacionFase {
  id: string;
  autor: string; // rol o usuario
  texto: string;
  tipo: "incidencia" | "mejora" | "observacion" | "general";
  timestamp: string;
}

// Check normativo con roles responsables y evidencia
export interface CheckNormativo {
  id: string;
  descripcion: string;
  obligatorio: boolean;
  cumplido: boolean;
  rol_responsable: string[];
  evidencia: string;
  timestamp: string | null;
}

// Fase del simulacro con checks y anotaciones
export interface FaseSimulacro {
  id: string;
  nombre: string;
  orden: number;
  checks: CheckNormativo[];
  anotaciones: AnotacionFase[];
  estado: "pendiente" | "en curso" | "cerrada";
  fecha_inicio: string | null;
  fecha_fin: string | null;
}

// Estructura de simulacro completo (solo para referencia)
export interface SimulacroEstructura {
  id: string;
  modo: "entrenamiento" | "simulacro";
  fecha_inicio: string;
  fecha_fin: string | null;
  fases: FaseSimulacro[];
  participantes: {
    id: string;
    nombre: string;
    rol: string;
    permisos: string[];
  }[];
  resumen_final: string;
}

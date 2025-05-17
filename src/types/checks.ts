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

// src/utils/rolesPermisos.ts
// Estructura de permisos por rol para simulacros y drills reales
// Trazabilidad: ver CopilotGuidelines.json, DrillGuide.json, uiMapeo.json

export type PermisosRol = {
  puedeVerSimulacion: boolean;
  puedeTomarDecisiones: boolean;
  puedeEditarEscenario: boolean;
  puedeObservar: boolean;
  puedeLiderar: boolean;
  puedeGestionarRoles: boolean;
  puedeMarcarChecks: boolean; // Permiso para marcar checks de cumplimiento
};

export const ROLES_PERMISOS: Record<string, PermisosRol> = {
  CAPITAN_BARCO_A: {
    puedeVerSimulacion: true,
    puedeTomarDecisiones: true,
    puedeEditarEscenario: false,
    puedeObservar: false,
    puedeLiderar: false,
    puedeGestionarRoles: false,
    puedeMarcarChecks: false,
  },
  ARMADOR_A: {
    puedeVerSimulacion: true,
    puedeTomarDecisiones: true,
    puedeEditarEscenario: false,
    puedeObservar: false,
    puedeLiderar: false,
    puedeGestionarRoles: false,
    puedeMarcarChecks: false,
  },
  CAPITANIA: {
    puedeVerSimulacion: true,
    puedeTomarDecisiones: true,
    puedeEditarEscenario: false,
    puedeObservar: false,
    puedeLiderar: false,
    puedeGestionarRoles: false,
    puedeMarcarChecks: false,
  },
  PECLA: {
    puedeVerSimulacion: true,
    puedeTomarDecisiones: true,
    puedeEditarEscenario: false,
    puedeObservar: false,
    puedeLiderar: false,
    puedeGestionarRoles: false,
    puedeMarcarChecks: false,
  },
  EMERGENCIAS_112: {
    puedeVerSimulacion: true,
    puedeTomarDecisiones: true,
    puedeEditarEscenario: false,
    puedeObservar: false,
    puedeLiderar: false,
    puedeGestionarRoles: false,
    puedeMarcarChecks: false,
  },
  ORGANIZADOR: {
    puedeVerSimulacion: true,
    puedeTomarDecisiones: false,
    puedeEditarEscenario: true,
    puedeObservar: true,
    puedeLiderar: false,
    puedeGestionarRoles: true,
    puedeMarcarChecks: true,
  },
  OBSERVADOR: {
    puedeVerSimulacion: true,
    puedeTomarDecisiones: false,
    puedeEditarEscenario: false,
    puedeObservar: true,
    puedeLiderar: false,
    puedeGestionarRoles: false,
    puedeMarcarChecks: true,
  },
  LIDER_SIMULACRO: {
    puedeVerSimulacion: true,
    puedeTomarDecisiones: false,
    puedeEditarEscenario: true,
    puedeObservar: true,
    puedeLiderar: true,
    puedeGestionarRoles: true,
    puedeMarcarChecks: true,
  },
  FLETADOR_A: {
    puedeVerSimulacion: true,
    puedeTomarDecisiones: true,
    puedeEditarEscenario: false,
    puedeObservar: false,
    puedeLiderar: false,
    puedeGestionarRoles: false,
    puedeMarcarChecks: false,
  },
  FLETADOR_B: {
    puedeVerSimulacion: true,
    puedeTomarDecisiones: true,
    puedeEditarEscenario: false,
    puedeObservar: false,
    puedeLiderar: false,
    puedeGestionarRoles: false,
    puedeMarcarChecks: false,
  },
  TERMINAL_MOEVE: {
    puedeVerSimulacion: true,
    puedeTomarDecisiones: true,
    puedeEditarEscenario: false,
    puedeObservar: false,
    puedeLiderar: false,
    puedeGestionarRoles: false,
    puedeMarcarChecks: false,
  },
  GABINETE_FABRICA: {
    puedeVerSimulacion: true,
    puedeTomarDecisiones: true,
    puedeEditarEscenario: false,
    puedeObservar: false,
    puedeLiderar: false,
    puedeGestionarRoles: false,
    puedeMarcarChecks: false,
  },
  GABINETE_TRADING: {
    puedeVerSimulacion: true,
    puedeTomarDecisiones: true,
    puedeEditarEscenario: false,
    puedeObservar: false,
    puedeLiderar: false,
    puedeGestionarRoles: false,
    puedeMarcarChecks: false,
  },
  // Agregar más roles según sea necesario
  // ...otros roles según rolesData.ts
};

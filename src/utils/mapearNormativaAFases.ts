// src/utils/mapearNormativaAFases.ts
// Utilidad para mapear normativa.json a fases y checks normativos por rol
import { FaseSimulacro, CheckNormativo } from "../types/checks";
import { uuidv4 } from "./uuid";

// Fases estándar del simulacro (puedes adaptar los nombres/orden)
export const FASES_SIMULACRO = [
  { id: "deteccion", nombre: "Detección e Identificación", orden: 1 },
  { id: "activacion", nombre: "Activación de Planes", orden: 2 },
  { id: "respuesta", nombre: "Respuesta y Contención", orden: 3 },
  { id: "recuperacion", nombre: "Recuperación y Limpieza", orden: 4 },
  { id: "conclusion", nombre: "Cierre y Evaluación", orden: 5 },
];

// Mapeo simple de palabras clave a fases (puedes mejorar con NLP o reglas)
const PALABRAS_CLAVE_FASES = {
  deteccion: [
    "detectar",
    "detección",
    "alerta",
    "aviso inicial",
    "notificar",
    "comunicar",
    "informar",
    "evaluar",
    "informe",
  ],
  activacion: ["activar", "activación", "declarar emergencia", "nivel"],
  respuesta: [
    "contener",
    "barrera",
    "recoger",
    "desplegar",
    "respuesta",
    "mitigar",
    "controlar",
  ],
  recuperacion: [
    "limpiar",
    "recuperar",
    "gestionar residuos",
    "fauna",
    "restaurar",
  ],
  conclusion: ["evaluar", "revisión", "mejora", "cierre", "conclusión"],
};

// Mapeo simple de roles a palabras clave (puedes mejorar con rolesData)
const ROLES_CLAVE = [
  {
    rol: "coordinador",
    claves: ["coordinación", "director", "comité", "autoridad"],
  },
  { rol: "capitania", claves: ["capitanía", "marítima", "DGMM"] },
  { rol: "emergencias112", claves: ["112", "protección civil", "emergencias"] },
  { rol: "autoridadPortuaria", claves: ["puerto", "portuaria", "AP"] },
  { rol: "observador", claves: ["observador", "evaluador", "supervisión"] },
];

// Extrae checks normativos de un texto largo (procedimientos, etc.)
function extraerChecksDeTexto(texto: string): string[] {
  if (!texto) return [];
  // Divide por frases y filtra las que parezcan acciones/procedimientos
  return texto
    .split(/[.;\n]/)
    .map((f) => f.trim())
    .filter((f) => f.length > 20 && /[a-z]/i.test(f));
}

// Asigna una fase a cada check según palabras clave
function asignarFase(check: string): string {
  for (const [fase, claves] of Object.entries(PALABRAS_CLAVE_FASES)) {
    if (claves.some((clave) => check.toLowerCase().includes(clave))) {
      return fase;
    }
  }
  // Por defecto, respuesta
  return "respuesta";
}

// Asigna roles responsables a cada check según palabras clave
function asignarRoles(check: string): string[] {
  const roles: string[] = [];
  for (const { rol, claves } of ROLES_CLAVE) {
    if (claves.some((clave) => check.toLowerCase().includes(clave))) {
      roles.push(rol);
    }
  }
  // Si no se detecta ninguno, asignar a 'coordinador' por defecto
  if (roles.length === 0) roles.push("coordinador");
  return roles;
}

// Tipo mínimo para normativa (solo los campos usados)
export interface NormativaMinima {
  procedimientos_principales?: string;
  elementos_simulacros?: string;
}

// Función principal: mapea normativa a fases y checks
export function mapearNormativaAFases(
  normativa: NormativaMinima[]
): FaseSimulacro[] {
  // Inicializa fases vacías
  const fases: FaseSimulacro[] = FASES_SIMULACRO.map((f) => ({
    ...f,
    checks: [],
    anotaciones: [],
    estado: "pendiente",
    fecha_inicio: null,
    fecha_fin: null,
  }));

  normativa.forEach((plan) => {
    // Extrae checks de procedimientos principales y elementos de simulacro
    const checksProcedimientos = extraerChecksDeTexto(
      plan.procedimientos_principales || ""
    );
    const checksSimulacros = extraerChecksDeTexto(
      plan.elementos_simulacros || ""
    );
    const checks = [...checksProcedimientos, ...checksSimulacros];
    checks.forEach((desc) => {
      const faseId = asignarFase(desc);
      const fase = fases.find((f) => f.id === faseId);
      if (!fase) return;
      const check: CheckNormativo = {
        id: uuidv4(),
        descripcion: desc,
        obligatorio: true,
        cumplido: false,
        rol_responsable: asignarRoles(desc),
        evidencia: "",
        timestamp: null,
      };
      fase.checks.push(check);
    });
  });

  // Ordena los checks por fase
  fases.forEach((f) =>
    f.checks.sort((a, b) => a.descripcion.localeCompare(b.descripcion))
  );
  return fases;
}

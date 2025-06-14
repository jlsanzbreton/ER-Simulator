// Constantes/arrays con información de roles
import { RolInfo } from "../types/simulacro";

export const ROLES_INFO: RolInfo[] = [
  {
    id: 1,
    code: "CAPITAN_BARCO_A",
    displayName: "Capitán del Barco A",
    description:
      "Responsable de la gestión a bordo, activación de planes internos, comunicación con armador y autoridades, y coordinación en el lugar del incidente.",
    icon: "icons/barcoA.svg", // Relative path
  },
  {
    id: 2,
    code: "CAPITAN_BARCO_B",
    displayName: "Capitán del Barco B",
    description:
      "Responsable de la gestión a bordo, activación de planes internos, comunicación con armador y autoridades, y coordinación en el lugar del incidente.",
    icon: "icons/barcoB.svg", // Relative path
  },
  {
    id: 3,
    code: "ARMADOR_A",
    displayName: "Armador A",
    description:
      "Responsable de la gestión del barco A, activación de planes internos, comunicación con el capitán y autoridades, y coordinación en el lugar del incidente.",
    icon: "icons/armadorA.svg", // Relative path
  },
  {
    id: 4,
    code: "ARMADOR_B",
    displayName: "Armador B",
    description:
      "Responsable de la gestión del barco B, activación de planes internos, comunicación con el capitán y autoridades, y coordinación en el lugar del incidente.",
    icon: "icons/armadorB.svg", // Relative path
  },
  {
    id: 5,
    code: "FLETADOR_A",
    displayName: "Fletador A",
    description:
      "Responsable de la gestión del fletador A, activación de planes internos, comunicación con el capitán y autoridades, y coordinación en el lugar del incidente.",
    icon: "icons/fletadorA.svg", // Relative path
  },
  {
    id: 6,
    code: "FLETADOR_B",
    displayName: "Fletador B",
    description:
      "Responsable de la gestión del fletador B, activación de planes internos, comunicación con el capitán y autoridades, y coordinación en el lugar del incidente.",
    icon: "icons/fletadorB.svg", // Relative path
  },
  {
    id: 7,
    code: "TERMINAL_MOEVE",
    displayName: "Terminal MOEVE",
    description:
      "Responsable de la gestión de la terminal MOEVE, activación de planes internos, comunicación con el capitán y autoridades, y coordinación en el lugar del incidente.",
    icon: "icons/moeve.svg", // Relative path
  },
  {
    id: 8,
    code: "GABINETE_FABRICA",
    displayName: "Gabinete de la Fábrica",
    description:
      "Responsable de la gestión del gabinete de la fábrica, activación de planes internos, comunicación con el capitán y autoridades, y coordinación en el lugar del incidente.",
    icon: "icons/gabineteFabrica.svg", // Relative path
  },
  {
    id: 9,
    code: "GABINETE_TRADING",
    displayName: "Gabinete Trading",
    description:
      "Responsable de la gestión del gabinete trading, activación de planes internos, comunicación con el capitán y autoridades, y coordinación en el lugar del incidente.",
    icon: "icons/gabineteTrading.svg", // Relative path
  },
  {
    id: 10,
    code: "CAPITANIA",
    displayName: "Capitanía",
    description:
      "Responsable de la gestión de la capitanía, activación de planes internos, comunicación con el capitán y autoridades, y coordinación en el lugar del incidente.",
    icon: "icons/capitania.svg", // Relative path
  },
  {
    id: 11,
    code: "PECLA",
    displayName: "PECLA",
    description:
      "Responsable de la gestión de PECLA, activación de planes internos, comunicación con el capitán y autoridades, y coordinación en el lugar del incidente.",
    icon: "icons/pecla.svg", // Relative path
  },
  {
    id: 12,
    code: "EMERGENCIAS_112",
    displayName: "Emergencias 112",
    description:
      "Responsable de la gestión de emergencias 112, activación de planes internos, comunicación con el capitán y autoridades, y coordinación en el lugar del incidente.",
    icon: "icons/emergencias112.svg", // Relative path
  },
  {
    id: 13,
    code: "ORGANIZADOR",
    displayName: "Coordinador de Simulacro",
    description:
      "Define los parámetros iniciales, supervisa el desarrollo general y evalúa los resultados del simulacro.",
    icon: "icons/organizador.svg", // Relative path
  },
  {
    id: 14,
    code: "OBSERVADOR",
    displayName: "Observador",
    description:
      "Sigue el simulacro sin intervenir directamente, tomando notas para la evaluación posterior.",
    icon: "icons/observador.svg", // Relative path
  },
  {
    id: 15,
    code: "LIDER_SIMULACRO",
    displayName: "Líder del Simulacro",
    description:
      "Dirige activamente las operaciones y la respuesta durante el simulacro, tomando decisiones clave.",
    icon: "icons/lider.svg", // Relative path
  },
  // Puedes añadir más roles según sea necesario
];

// Crear un mapa para búsqueda rápida por código de rol
export const ROLES_INFO_MAP = new Map<string, RolInfo>();
ROLES_INFO.forEach((rol) => {
  ROLES_INFO_MAP.set(rol.code, rol);
});

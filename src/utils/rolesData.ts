// Constantes/arrays con información de roles
import { RolInfo } from "../types/simulacro";

export const ROLES_INFO: RolInfo[] = [
  {
    id: 1,
    code: "CAPITAN_BARCO_A",
    displayName: "Capitán del Barco A",
    description:
      "Responsable de la gestión a bordo, activación de planes internos, comunicación con armador y autoridades, y coordinación en el lugar del incidente.",
    icon: "/icons/barcoA.svg",
  },
  {
    id: 2,
    code: "CAPITAN_BARCO_B",
    displayName: "Capitán del Barco B",
    description:
      "Responsable de la gestión a bordo, activación de planes internos, comunicación con armador y autoridades, y coordinación en el lugar del incidente.",
    icon: "/icons/barcoB.svg",
  },
  {
    id: 3,
    code: "ARMADOR_A",
    displayName: "Armador A",
    description:
      "Responsable de la gestión del barco A, activación de planes internos, comunicación con el capitán y autoridades, y coordinación en el lugar del incidente.",
    icon: "/icons/armadorA.svg",
  },
  {
    id: 4,
    code: "ARMADOR_B",
    displayName: "Armador B",
    description:
      "Responsable de la gestión del barco B, activación de planes internos, comunicación con el capitán y autoridades, y coordinación en el lugar del incidente.",
    icon: "/icons/armadorB.svg",
  },
  {
    id: 5,
    code: "FLETADOR_A",
    displayName: "Fletador A",
    description:
      "Responsable de la gestión del fletador A, activación de planes internos, comunicación con el capitán y autoridades, y coordinación en el lugar del incidente.",
    icon: "/icons/fletadorA.svg",
  },
  {
    id: 6,
    code: "FLETADOR_B",
    displayName: "Fletador B",
    description:
      "Responsable de la gestión del fletador B, activación de planes internos, comunicación con el capitán y autoridades, y coordinación en el lugar del incidente.",
    icon: "/icons/fletadorB.svg",
  },
  {
    id: 7,
    code: "TERMINAL_MOEVE",
    displayName: "Terminal MOEVE",
    description:
      "Responsable de la gestión de la terminal MOEVE, activación de planes internos, comunicación con el capitán y autoridades, y coordinación en el lugar del incidente.",
    icon: "/icons/moeve.svg",
  },
  {
    id: 8,
    code: "GABINETE_FABRICA",
    displayName: "Gabinete de la Fábrica",
    description:
      "Responsable de la gestión del gabinete de la fábrica, activación de planes internos, comunicación con el capitán y autoridades, y coordinación en el lugar del incidente.",
    icon: "/icons/gabineteFabrica.svg",
  },
  {
    id: 9,
    code: "GABINETE_TRADING",
    displayName: "Gabinete Trading",
    description:
      "Responsable de la gestión del gabinete trading, activación de planes internos, comunicación con el capitán y autoridades, y coordinación en el lugar del incidente.",
    icon: "/icons/gabineteTrading.svg",
  },
  {
    id: 10,
    code: "CAPITANIA",
    displayName: "Capitanía",
    description:
      "Responsable de la gestión de la capitanía, activación de planes internos, comunicación con el capitán y autoridades, y coordinación en el lugar del incidente.",
    icon: "/icons/capitania.svg",
  },
  {
    id: 11,
    code: "PECLA",
    displayName: "PECLA",
    description:
      "Responsable de la gestión de PECLA, activación de planes internos, comunicación con el capitán y autoridades, y coordinación en el lugar del incidente.",
    icon: "/icons/pecla.svg",
  },
  {
    id: 12,
    code: "EMERGENCIAS_112",
    displayName: "Emergencias 112",
    description:
      "Responsable de la gestión de emergencias 112, activación de planes internos, comunicación con el capitán y autoridades, y coordinación en el lugar del incidente.",
    icon: "/icons/emergencias112.svg",
  },
  {
    id: 13,
    code: "ORGANIZADOR",
    displayName: "Organizador",
    description:
      "Responsable de la organización y supervisión del simulacro. Puede marcar checks de cumplimiento y gestionar roles.",
    icon: "/icons/organizador.svg",
  },
  {
    id: 14,
    code: "OBSERVADOR",
    displayName: "Observador",
    description:
      "Observador independiente encargado de registrar el desarrollo y cumplimiento del simulacro. Puede marcar checks de cumplimiento.",
    icon: "/icons/observador.svg",
  },
  {
    id: 15,
    code: "LIDER_SIMULACRO",
    displayName: "Líder del Simulacro",
    description:
      "Líder general del simulacro, con capacidad de supervisión, gestión de roles y marcado de checks.",
    icon: "/icons/lider.svg",
  },
];
export const ROLES_INFO_MAP: Record<string, RolInfo> = ROLES_INFO.reduce(
  (acc, rol) => {
    acc[rol.code] = rol;
    return acc;
  },
  {} as Record<string, RolInfo>
);

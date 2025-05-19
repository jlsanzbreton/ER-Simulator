// src/components/SimulacionMain/Timeline.tsx
// Timeline visual de fases del simulacro
import React from "react";
import {
  FaBell,
  FaUsers,
  FaComments,
  FaFlagCheckered,
  FaWater,
  FaLeaf,
  FaHandsHelping,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import type { ReactNode } from "react";
import { FaseSimulacro } from "../../types/checks";

interface TimelineProps {
  fases: FaseSimulacro[];
  actual: string;
  modo?: "entrenamiento" | "simulacro";
  onFaseClick?: (fase: string) => void;
  checksPorFase?: Record<string, { obligatorias: number; cumplidas: number }>;
}

const FASES_ICONOS: Record<string, ReactNode> = {
  deteccion: <FaBell />,
  activacion: <FaComments />,
  contencion: <FaWater />,
  recuperacion: <FaLeaf />,
  restauracion: <FaHandsHelping />,
  coordinacion: <FaUsers />,
  conclusion: <FaFlagCheckered />,
};

const Timeline: React.FC<TimelineProps> = ({
  fases,
  actual,
  modo,
  onFaseClick,
  checksPorFase,
}) => (
  <nav className="timeline-bar mb-2" aria-label="Fases del simulacro">
    <ol className="timeline-list">
      {fases.map((faseObj, idx) => {
        const faseId = faseObj.id;
        // Una fase está completada sólo si todas sus checks obligatorias están cumplidas
        const checksFase = checksPorFase?.[faseId];
        const todasObligCumplidas =
          checksFase &&
          checksFase.obligatorias > 0 &&
          checksFase.obligatorias === checksFase.cumplidas;
        // El estado visual depende de si la fase está realmente completada, no de la posición
        let estado = "pendiente";
        if (faseId === actual) estado = "actual";
        else if (todasObligCumplidas) estado = "completada";
        const esSimulacro = modo === "simulacro";
        // Estado de checks obligatorias
        const hayObligPendientes =
          checksFase &&
          checksFase.obligatorias > 0 &&
          checksFase.cumplidas < checksFase.obligatorias &&
          checksFase.cumplidas > 0;
        let iconColor = undefined;
        if (todasObligCumplidas) iconColor = "#43a047"; // verde
        else if (hayObligPendientes) iconColor = "#fbc02d"; // amarillo
        return (
          <li
            key={faseId}
            className={`timeline-step timeline-${estado}`}
            aria-current={faseId === actual ? "step" : undefined}
          >
            <span
              className={`timeline-icon-bg timeline-${estado} ${
                esSimulacro ? "timeline-clickable" : ""
              }`}
              data-timeline-color={iconColor || undefined}
              {...(esSimulacro
                ? {
                    tabIndex: 0,
                    role: "button",
                    onClick: () => {
                      if (onFaseClick) onFaseClick(faseId);
                    },
                    onKeyDown: (e: React.KeyboardEvent) => {
                      if (e.key === "Enter" || e.key === " ") {
                        if (onFaseClick) onFaseClick(faseId);
                      }
                    },
                    "aria-label": `Abrir checklist de la fase ${faseObj.nombre}`,
                  }
                : {})}
            >
              {FASES_ICONOS[faseId] || <FaFlagCheckered />}
              {todasObligCumplidas ? (
                <FaCheckCircle
                  className="timeline-check-icon"
                  style={{ color: "#43a047", marginLeft: 4 }}
                />
              ) : hayObligPendientes ? (
                <FaExclamationTriangle
                  className="timeline-check-icon"
                  style={{ color: "#fbc02d", marginLeft: 4 }}
                />
              ) : null}
            </span>
            <span className={`timeline-label timeline-${estado}`}>
              {faseObj.nombre}
            </span>
            {idx < fases.length - 1 && <span className="timeline-connector" />}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Timeline;

// src/components/SimulacionMain/Timeline.tsx
// Timeline visual de fases del simulacro
import React from "react";
import {
  FaFlagCheckered,
  FaBell,
  FaCogs,
  FaUsers,
  FaComments,
} from "react-icons/fa";
import type { ReactNode } from "react";

interface TimelineProps {
  fases: string[];
  actual: string;
  modo?: "entrenamiento" | "simulacro";
  onFaseClick?: (fase: string) => void;
}

const FASES_ICONOS: Record<string, ReactNode> = {
  deteccion: <FaFlagCheckered />,
  notificacion: <FaBell />,
  gestion: <FaCogs />,
  coordinacion: <FaUsers />,
  comunicacion: <FaComments />,
  conclusion: <FaFlagCheckered />,
};

const Timeline: React.FC<TimelineProps> = ({
  fases,
  actual,
  modo,
  onFaseClick,
}) => (
  <nav className="timeline-bar mb-2" aria-label="Fases del simulacro">
    <ol className="timeline-list">
      {fases.map((fase, idx) => {
        const estado =
          fase === actual
            ? "actual"
            : idx < fases.indexOf(actual)
            ? "completada"
            : "pendiente";
        const esSimulacro = modo === "simulacro";
        return (
          <li
            key={fase}
            className={`timeline-step timeline-${estado}`}
            aria-current={fase === actual ? "step" : undefined}
          >
            <span
              className={`timeline-icon-bg timeline-${estado} ${
                esSimulacro ? "timeline-clickable" : ""
              }`}
              {...(esSimulacro
                ? {
                    tabIndex: 0,
                    role: "button",
                    onClick: () => {
                      if (onFaseClick) onFaseClick(fase);
                    },
                    onKeyDown: (e: React.KeyboardEvent) => {
                      if (e.key === "Enter" || e.key === " ") {
                        if (onFaseClick) onFaseClick(fase);
                      }
                    },
                    "aria-label": `Abrir checklist de la fase ${fase}`,
                  }
                : {})}
            >
              {FASES_ICONOS[fase] || <FaFlagCheckered />}
            </span>
            <span className={`timeline-label timeline-${estado}`}>
              {fase.charAt(0).toUpperCase() + fase.slice(1)}
            </span>
            {idx < fases.length - 1 && <span className="timeline-connector" />}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Timeline;

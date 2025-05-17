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
}

const FASES_ICONOS: Record<string, ReactNode> = {
  deteccion: <FaFlagCheckered />,
  notificacion: <FaBell />,
  gestion: <FaCogs />,
  coordinacion: <FaUsers />,
  comunicacion: <FaComments />,
  conclusion: <FaFlagCheckered />,
};

const Timeline: React.FC<TimelineProps> = ({ fases, actual }) => (
  <nav className="timeline-bar mb-2" aria-label="Fases del simulacro">
    <ol className="timeline-list">
      {fases.map((fase, idx) => {
        const estado =
          fase === actual
            ? "actual"
            : idx < fases.indexOf(actual)
            ? "completada"
            : "pendiente";
        return (
          <li
            key={fase}
            className={`timeline-step timeline-${estado}`}
            aria-current={fase === actual ? "step" : undefined}
          >
            <span className={`timeline-icon-bg timeline-${estado}`}>
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

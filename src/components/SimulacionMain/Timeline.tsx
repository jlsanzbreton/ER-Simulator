// src/components/SimulacionMain/Timeline.tsx
// Timeline visual de fases del simulacro
import React from "react";

interface TimelineProps {
  fases: string[];
  actual: string;
}

const Timeline: React.FC<TimelineProps> = ({ fases, actual }) => (
  <div className="timeline-bar mb-2">
    {fases.map((fase, idx) => (
      <span
        key={fase}
        className={`timeline-step${fase === actual ? " active" : ""}`}
        aria-current={fase === actual ? "step" : undefined}
      >
        {fase.charAt(0).toUpperCase() + fase.slice(1)}
        {idx < fases.length - 1 && <span className="timeline-sep">→</span>}
      </span>
    ))}
  </div>
);

export default Timeline;

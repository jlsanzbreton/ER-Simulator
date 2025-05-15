// Componente principal de la simulación
import React, { useState } from "react";
import { SimulacionMainProps } from "../../types/simulacro";
import Fase from "./Fase";
import Feedback from "./Feedback";

// Si tienes los tipos FaseSimulacro definidos en types/simulacro, úsalo. Si no, usa string para MVP.
const FASES = [
  "deteccion",
  "notificacion",
  "gestion",
  "coordinacion",
  "comunicacion",
  "conclusion",
] as const;
type FaseSimulacro = (typeof FASES)[number];

interface SimulacionMainExtendedProps extends SimulacionMainProps {
  onReset: () => void;
}

const SimulacionMain: React.FC<SimulacionMainExtendedProps> = ({
  rol,
  condiciones,
  onReset,
}) => {
  const [faseActual, setFaseActual] = useState<FaseSimulacro>("deteccion");
  const [decisiones, setDecisiones] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<string | null>(null);

  // Al pulsar decisión, actualiza decisiones y muestra feedback breve
  const handleDecision = (fase: string, decision: string, feedback: string) => {
    setDecisiones((prev) => ({ ...prev, [fase]: decision }));
    setFeedback(feedback);
    setTimeout(() => {
      setFeedback(null);
      const idx = FASES.indexOf(fase as FaseSimulacro);
      if (idx < FASES.length - 1) {
        setFaseActual(FASES[idx + 1]);
      }
    }, 1700);
  };

  // Mostrar resumen y botón de reinicio cuando termina la simulación
  if (faseActual === "conclusion") {
    return (
      <div className="card flex-center flex-column">
        <h2>¡Simulación completada!</h2>
        <div className="mt-2 mb-2">
          <b>Rol:{rol.displayName}</b>
        </div>
        <div className="card mb-2">
          <b>Condiciones ambientales:</b>
          <div>{condiciones.resumen}</div>
        </div>
        <ul className="list-unstyled mt-2 mb-2">
          {Object.entries(decisiones).map(([fase, dec]) => (
            <li key={fase}>
              <b>{fase.charAt(0).toUpperCase() + fase.slice(1)}:</b> {dec}
            </li>
          ))}
        </ul>
        <button className="mt-2" onClick={onReset}>
          Volver a empezar
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Simulación: {rol.displayName}</h1>
      <div className="mt-2 mb-2">
        <b>Condiciones ambientales:</b>
        <div className="card mt-1 mb-1">{condiciones.resumen}</div>
      </div>
      <Fase
        fase={faseActual}
        rol={rol}
        condiciones={condiciones}
        onDecision={handleDecision}
        isBlocked={!!feedback}
      />
      {feedback && <Feedback texto={feedback} />}
    </div>
  );
};

export default SimulacionMain;

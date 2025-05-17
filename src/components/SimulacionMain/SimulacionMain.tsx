// Componente principal de la simulación
import React, { useState } from "react";
import { SimulacionMainProps } from "../../types/simulacro";
import Fase from "./Fase";
import Feedback from "./Feedback";
import SimMap from "../UI/SimMap";

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
  derramaCoords, // <-- Añadido: coordenadas del derrame
  onReset,
}) => {
  const [faseActual, setFaseActual] = useState<FaseSimulacro>("deteccion");
  const [decisiones, setDecisiones] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<string | null>(null);

  // Mostrar cabecera con rol y condiciones
  const CabeceraSimulacion = () => (
    <div className="card card-full flex-center flex-column mb-2">
      <div className="role-title mb-1">
        Rol activo: <span className="rol-activo">{rol}</span>
      </div>
      <div className="role-desc mb-1">
        Condiciones ambientales: {condiciones.resumen}
      </div>
    </div>
  );

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
        <CabeceraSimulacion />
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
      <SimMap
        coords={derramaCoords}
        condiciones={condiciones}
        fase={faseActual}
      />
      <CabeceraSimulacion />
      <div className="card card-max card-centered mt-2">
        <Fase
          fase={faseActual}
          rol={rol}
          condiciones={condiciones}
          onDecision={handleDecision}
          isBlocked={!!feedback}
        />
        {feedback && <Feedback texto={feedback} />}
      </div>
      {/* Checklist de Cumplimiento (activar cuando esté listo y según permisos)
      {permisosRol?.puedeMarcarChecks && (
        <ChecklistCumplimiento ... />
      )}
      */}
    </div>
  );
};

export default SimulacionMain;

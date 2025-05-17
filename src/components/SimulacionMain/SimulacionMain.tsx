// Componente principal de la simulación
import React, { useState } from "react";
import { SimulacionMainProps } from "../../types/simulacro";
import Fase from "./Fase";
import Feedback from "./Feedback";
import dynamic from "next/dynamic";
import { useSimulacro } from "@/context/SimulacroContext";
import Timeline from "./Timeline";
import ChecklistCumplimiento from "./ChecklistCumplimiento";
import { SimulacroCheck } from "@/types/checks";

const SimMap = dynamic(() => import("@/components/UI/SimMap"), {
  ssr: false,
  loading: () => <p>Cargando mapa...</p>,
});

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
  derramaCoords,
  onReset,
}) => {
  const [faseActual, setFaseActual] = useState<FaseSimulacro>("deteccion");
  const [decisiones, setDecisiones] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<string | null>(null);
  // Estado para checks de cumplimiento (mock inicial)
  const [checks, setChecks] = useState<SimulacroCheck[]>([
    {
      id: "c1",
      descripcion: "Notificación a autoridades",
      fase: "notificacion",
      obligatorio: true,
    },
    {
      id: "c2",
      descripcion: "Activación de recursos",
      fase: "gestion",
      obligatorio: true,
    },
    {
      id: "c3",
      descripcion: "Comunicación interna",
      fase: "comunicacion",
      obligatorio: false,
    },
  ]);
  const { permisosRol, rolSeleccionado } = useSimulacro();

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

  // Handler para marcar checks
  const handleCheck = (id: string, observaciones?: string) => {
    setChecks((prev) =>
      prev.map((c) =>
        c.id === id && !c.marcadoPor
          ? {
              ...c,
              marcadoPor: rolSeleccionado || rol,
              horaMarcado: new Date().toISOString(),
              observaciones,
            }
          : c
      )
    );
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
      <Timeline fases={FASES as unknown as string[]} actual={faseActual} />
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
      {/* Checklist de Cumplimiento visible solo si el rol tiene permiso */}
      {permisosRol?.puedeMarcarChecks && (
        <ChecklistCumplimiento
          checks={checks}
          onCheck={handleCheck}
          usuario={rolSeleccionado || rol}
          faseActual={faseActual}
        />
      )}
    </div>
  );
};

export default SimulacionMain;

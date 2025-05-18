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
import { ROLES_INFO_MAP } from "@/utils/rolesData";
import { FaWind, FaTemperatureHigh, FaClock } from "react-icons/fa";
import Image from "next/image";
import { SimulacroCondicionesAmbientales } from "@/types/simulacro";

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
  modo: "entrenamiento" | "simulacro";
}

const SimulacionMain: React.FC<SimulacionMainExtendedProps> = ({
  rol,
  condiciones,
  derramaCoords,
  onReset,
  modo,
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
        <CabeceraSimulacion
          rol={rol}
          condiciones={condiciones}
          fase={faseActual}
        />
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
      <Timeline
        fases={FASES as unknown as string[]}
        actual={faseActual}
        modo={modo}
        onFaseClick={
          modo === "simulacro"
            ? (fase) => setFaseActual(fase as FaseSimulacro)
            : undefined
        }
      />
      <SimMap
        coords={derramaCoords}
        condiciones={condiciones}
        fase={faseActual}
      />
      <CabeceraSimulacion
        rol={rol}
        condiciones={condiciones}
        fase={faseActual}
      />
      {/* Checklist de Cumplimiento SIEMPRE visible para la fase seleccionada */}
      {permisosRol?.puedeMarcarChecks && (
        <ChecklistCumplimiento
          checks={checks}
          onCheck={handleCheck}
          usuario={rolSeleccionado || rol}
          faseActual={faseActual}
        />
      )}
      {/* Solo mostrar la tarjeta de preguntas/decisiones en modo entrenamiento */}
      {modo === "entrenamiento" && (
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
      )}
    </div>
  );
};

// Refactorizo la cabecera de simulación para mostrar icono y nombre del rol, condiciones ambientales con iconos y la fase actual destacada. Todo accesible y visualmente atractivo.
const CabeceraSimulacion: React.FC<{
  rol: string;
  condiciones: SimulacroCondicionesAmbientales;
  fase: string;
}> = ({ rol, condiciones }) => {
  const rolInfo = ROLES_INFO_MAP[rol];
  return (
    <div className="cabecera-simulacion-marco cabecera-simulacion-dos">
      <div className="cabecera-simulacion-tarjeta cabecera-rol">
        {rolInfo?.icon && (
          <Image
            src={rolInfo.icon}
            alt={rolInfo.displayName}
            className="rol-icon-badge"
            width={36}
            height={36}
          />
        )}
        <span className="rol-badge">{rolInfo?.displayName || rol}</span>
      </div>
      <div className="cabecera-simulacion-tarjeta cabecera-condiciones">
        <span className="cond-badge">
          <FaWind /> {condiciones.viento.direccion} {condiciones.viento.fuerza}{" "}
          kt
        </span>
        <span className="cond-badge">
          <FaTemperatureHigh /> {condiciones.temperatura}ºC
        </span>
        <span className="cond-badge">
          <FaClock /> {condiciones.hora}
        </span>
      </div>
    </div>
  );
};

export default SimulacionMain;

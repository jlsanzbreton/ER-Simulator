// Componente principal de la simulación
import React, { useState } from "react";
import { SimulacionMainProps } from "../../types/simulacro";
import Fase from "./Fase";
import Feedback from "./Feedback";
import { useSimulacro } from "@/context/SimulacroContext";
import Timeline from "./Timeline";
import ChecklistCumplimiento from "./ChecklistCumplimiento";
import { ROLES_INFO_MAP } from "@/utils/rolesData";
import { FaWind, FaTemperatureHigh, FaClock } from "react-icons/fa";
import Image from "next/image";
import { SimulacroCondicionesAmbientales } from "@/types/simulacro";
// Para importar el JSON tipado correctamente
import fasesChecksSimulacro from "../../utils/fasesChecksSimulacro.json";
import { FaseSimulacro, CheckNormativo } from "../../types/checks";
import dynamic from "next/dynamic";
// Elimina la importación directa de SimMap y usa import dinámico para evitar errores SSR
const SimMap = dynamic(() => import("../UI/SimMap"), { ssr: false });

// Deriva las fases desde el JSON, tipado correctamente
const FASES: FaseSimulacro[] = fasesChecksSimulacro as FaseSimulacro[];
const FASES_IDS = FASES.map((f) => f.id);
type FaseSimulacroId = (typeof FASES_IDS)[number];

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
  // Cambiar el tipo de useState para faseActual a string, y asegurar el tipado correcto en el callback de Timeline
  const [faseActual, setFaseActual] = useState<string>(FASES_IDS[0]);
  const [decisiones, setDecisiones] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<string | null>(null);
  const { permisosRol, rolSeleccionado } = useSimulacro();

  // Estado global de checks para todas las fases
  const [checksPorFase, setChecksPorFase] = useState<{
    [faseId: string]: CheckNormativo[];
  }>(() => {
    const res: { [faseId: string]: CheckNormativo[] } = {};
    FASES.forEach((fase) => {
      res[fase.id] = fase.checks.map((c) => ({ ...c }));
    });
    return res;
  });

  // Resumen de checks por fase para Timeline
  const checksPorFaseResumen: Record<
    string,
    { obligatorias: number; cumplidas: number }
  > = {};
  Object.entries(checksPorFase).forEach(([faseId, checks]) => {
    const obligatorias = checks.filter((c) => c.obligatorio).length;
    const cumplidas = checks.filter((c) => c.obligatorio && c.cumplido).length;
    checksPorFaseResumen[faseId] = { obligatorias, cumplidas };
  });

  // Adaptar la obtención de la fase actual y los checks:
  const checksActuales = checksPorFase[faseActual] || [];

  // Al pulsar decisión, actualiza decisiones y muestra feedback breve
  const handleDecision = (fase: string, decision: string, feedback: string) => {
    setDecisiones((prev) => ({ ...prev, [fase]: decision }));
    setFeedback(feedback);
    setTimeout(() => {
      setFeedback(null);
      const idx = FASES_IDS.indexOf(fase as FaseSimulacroId);
      if (idx < FASES_IDS.length - 1) {
        setFaseActual(FASES_IDS[idx + 1]);
      }
    }, 1700);
  };

  // Handler para marcar checks (reactivo y global)
  const handleCheck = (id: string, observaciones?: string) => {
    setChecksPorFase((prev) => {
      const nuevos = { ...prev };
      nuevos[faseActual] = nuevos[faseActual].map((c) =>
        c.id === id && !c.cumplido
          ? {
              ...c,
              cumplido: true,
              evidencia: observaciones || "",
              timestamp: new Date().toISOString(),
            }
          : c
      );
      return nuevos;
    });
  };

  // Mostrar botón "Cerrar simulacro" sólo si estamos en la fase conclusión y todas las checks obligatorias de todas las fases están cumplidas
  const todasObligatoriasCumplidas = Object.values(checksPorFase).every((arr) =>
    arr.filter((c) => c.obligatorio).every((c) => c.cumplido)
  );

  if (faseActual === "conclusion" && todasObligatoriasCumplidas) {
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
        <button className="mt-2 btn-accent" onClick={onReset}>
          Cerrar simulacro
        </button>
      </div>
    );
  }

  return (
    <div>
      <Timeline
        fases={FASES}
        actual={faseActual}
        modo={modo}
        onFaseClick={
          modo === "simulacro"
            ? (fase: string) => setFaseActual(fase)
            : undefined
        }
        checksPorFase={checksPorFaseResumen}
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
      {permisosRol?.puedeMarcarChecks && modo === "simulacro" && (
        <ChecklistCumplimiento
          checks={checksActuales}
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

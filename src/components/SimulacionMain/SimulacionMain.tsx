// Componente principal de la simulación
import React, { useState } from "react";
import { SimulacionMainProps } from "../../types/simulacro";
import Fase from "./Fase";
// import Feedback from "./Feedback"; // Comentado temporalmente
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
const MapCard = dynamic(() => import("../UI/MapCard"), { ssr: false });
import { RolSimulacro } from "../../types/simulacro";
// Elimina la importación directa de SimMap y usa import dinámico para evitar errores SSR
const SimMap = dynamic(() => import("../UI/SimMap"), { ssr: false });
import { ROLES_INFO } from "../../utils/rolesData";
import { generarCondicionesAmbientales } from "../../utils/enviroMonteCarlo";
import { RolInfo } from "../../types/simulacro";
import CondicionCard from "../EnviroGenerator/CondicionCard";

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

  // Panel de edición de parámetros (cabecera editable)
  const PanelEdicionParametros: React.FC<{
    modo: "entrenamiento" | "simulacro";
    rol: RolSimulacro;
    condiciones: SimulacroCondicionesAmbientales;
    derramaCoords: { lat: number; lng: number };
    onRolChange: (rol: RolSimulacro) => void;
    onCondicionesChange: (cond: SimulacroCondicionesAmbientales) => void;
    onCoordsChange: (coords: { lat: number; lng: number }) => void;
  }> = ({
    modo,
    rol,
    condiciones,
    derramaCoords,
    onRolChange,
    onCondicionesChange,
    onCoordsChange,
  }) => {
    const rolesDisponibles: RolInfo[] =
      modo === "entrenamiento"
        ? ROLES_INFO.filter((r) =>
            [
              "CAPITAN_BARCO_A",
              "CAPITAN_BARCO_B",
              "ARMADOR_A",
              "ARMADOR_B",
              "FLETADOR_A",
              "FLETADOR_B",
              "TERMINAL_MOEVE",
              "GABINETE_FABRICA",
              "GABINETE_TRADING",
              "CAPITANIA",
              "PECLA",
              "EMERGENCIAS_112",
            ].includes(r.code)
          )
        : ROLES_INFO.filter((r) =>
            ["ORGANIZADOR", "OBSERVADOR", "LIDER_SIMULACRO"].includes(r.code)
          );

    return (
      <div className="panel-edicion-parametros card card-max mb-2">
        <h3>Parámetros de la simulación</h3>
        <div className="flex-row flex-wrap gap-2">
          {/* Selector de rol */}
          <div>
            <label htmlFor="rol-selector">Rol:</label>
            <select
              id="rol-selector"
              name="rol-selector"
              value={rol}
              onChange={(e) => onRolChange(e.target.value as RolSimulacro)}
              className="input"
              title="Selecciona el rol para la simulación"
            >
              {rolesDisponibles.map((r) => (
                <option key={r.code} value={r.code}>
                  {r.displayName}
                </option>
              ))}
            </select>
          </div>
          {/* Edición de condiciones */}
          {modo === "simulacro" && (
            <div className="panel-edicion-condiciones">
              <label>Condiciones ambientales:</label>
              <button
                className="btn btn-sm ml-1"
                onClick={() => {
                  onCondicionesChange(generarCondicionesAmbientales());
                }}
              >
                Regenerar
              </button>
              <div>
                <CondicionCard condiciones={condiciones} />
              </div>
            </div>
          )}
          {/* Edición de coordenadas */}
          {modo === "simulacro" && (
            <div className="panel-edicion-coords">
              <label>Coordenadas del derrame:</label>
              <MapCard coords={derramaCoords} onCoordsChange={onCoordsChange} />
            </div>
          )}
        </div>
      </div>
    );
  };

  // Estado editable para parámetros
  const [rolEdit, setRolEdit] = useState<RolSimulacro>(rol);
  const [condicionesEdit, setCondicionesEdit] =
    useState<SimulacroCondicionesAmbientales>(condiciones);
  const [coordsEdit, setCoordsEdit] = useState<{ lat: number; lng: number }>(
    derramaCoords
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
      <PanelEdicionParametros
        modo={modo}
        rol={rolEdit}
        condiciones={condicionesEdit}
        derramaCoords={coordsEdit}
        onRolChange={setRolEdit}
        onCondicionesChange={setCondicionesEdit}
        onCoordsChange={setCoordsEdit}
      />
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
        coords={coordsEdit}
        condiciones={condicionesEdit}
        fase={faseActual}
      />
      <CabeceraSimulacion
        rol={rolEdit}
        condiciones={condicionesEdit}
        fase={faseActual}
      />
      {/* Checklist de Cumplimiento SIEMPRE visible para la fase seleccionada */}
      {permisosRol?.puedeMarcarChecks && modo === "simulacro" && (
        <ChecklistCumplimiento
          checks={checksActuales}
          onCheck={handleCheck}
          usuario={rolSeleccionado || rolEdit}
          faseActual={faseActual}
        />
      )}
      {/* Solo mostrar la tarjeta de preguntas/decisiones en modo entrenamiento */}
      {modo === "entrenamiento" && (
        <div className="card card-max card-centered mt-2">
          <Fase
            fase={faseActual}
            rol={rolEdit}
            condiciones={condicionesEdit}
            onDecision={handleDecision}
            isBlocked={!!feedback}
          />
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

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useSimulacro } from "../context/SimulacroContext";
import EnviroGenerator from "../components/EnviroGenerator/EnviroGenerator";
import SimulacionMain from "../components/SimulacionMain/SimulacionMain";
import { ROLES_INFO } from "../utils/rolesData";
import Dashboard from "../components/Dashboard/Dashboard";
import RoleDropdown from "../components/RoleSelector/RoleDropdown";
import { DerrameCoords, RolInfo, RolSimulacro } from "../types/simulacro";
import { ModoSimulador } from "../types/dualidad";

// Dynamic import para MapCard (Leaflet, evitar SSR)
const MapCard = dynamic(() => import("../components/UI/MapCard"), {
  ssr: false,
});

const ROLES_ENTRENAMIENTO: RolSimulacro[] = [
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
];
const ROLES_SIMULACRO: RolSimulacro[] = [
  "ORGANIZADOR",
  "OBSERVADOR",
  "LIDER_SIMULACRO",
];

export default function LandingSimulacro() {
  const {
    rolSeleccionado,
    setRol,
    condiciones,
    setCondiciones,
    resetSimulacro,
    setDerrameCoords,
    derrameCoords,
  } = useSimulacro();

  const [showDashboard, setShowDashboard] = useState(true);
  const [derrCoords, setDerrCoords] = useState<DerrameCoords | null>(null);
  const [role, setRole] = useState<RolInfo | null>(null);
  const [step, setStep] = useState<"map" | "role" | "enviro" | "sim">("map");
  const [modo, setModo] = useState<ModoSimulador | null>(null);

  const handleStart = (modoElegido: ModoSimulador) => {
    setShowDashboard(false);
    resetSimulacro();
    setDerrCoords(null);
    setRole(null);
    setStep("map");
    setModo(modoElegido);
  };

  const handleReset = () => {
    setShowDashboard(true);
    resetSimulacro();
    setDerrCoords(null);
    setRole(null);
    setStep("map");
    setModo(null);
  };

  // Renderiza Dashboard si corresponde
  if (showDashboard) {
    return <Dashboard onStart={handleStart} />;
  }

  // Filtrado de roles según modo
  const rolesFiltrados =
    modo === "entrenamiento"
      ? ROLES_INFO.filter((r) => ROLES_ENTRENAMIENTO.includes(r.code))
      : ROLES_INFO.filter((r) => ROLES_SIMULACRO.includes(r.code));

  // Flujo paso a paso
  return (
    <div>
      {/* Paso 1: Seleccionar coordenadas en el mapa */}
      {step === "map" && (
        <div>
          <MapCard coords={derrCoords} onCoordsChange={setDerrCoords} />
          <button
            className="btn-accent"
            onClick={() => {
              setDerrameCoords(derrCoords); // <-- ¡Guarda en contexto!
              setStep("role");
            }}
            disabled={!derrCoords}
          >
            Confirmar ubicación
          </button>
        </div>
      )}

      {/* Paso 2: Selección de rol */}
      {step === "role" && (
        <div>
          <RoleDropdown
            roles={rolesFiltrados}
            selectedRole={role}
            onChange={setRole}
          />
          <button
            className="btn-accent"
            onClick={() => {
              if (role) {
                setRol(role.code); // Solo pasar el código del rol si existe
                setStep("enviro");
              }
            }}
            disabled={!role}
          >
            Confirmar rol
          </button>
        </div>
      )}

      {/* Paso 3: Condiciones ambientales */}
      {step === "enviro" && (
        <EnviroGenerator
          onGenerated={(c) => {
            setCondiciones(c);
            setStep("sim");
          }}
        />
      )}
      {/* Paso 4: Simulación principal */}
      {step === "sim" &&
        rolSeleccionado &&
        condiciones &&
        derrameCoords &&
        modo && (
          <SimulacionMain
            rol={rolSeleccionado}
            condiciones={condiciones}
            onReset={handleReset}
            derramaCoords={derrameCoords}
            modo={modo}
          />
        )}
    </div>
  );
}

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useSimulacro } from "../context/SimulacroContext";
import EnviroGenerator from "../components/EnviroGenerator/EnviroGenerator";
import SimulacionMain from "../components/SimulacionMain/SimulacionMain";
import { ROLES_INFO } from "../utils/rolesData";
import Dashboard from "../components/Dashboard/Dashboard";
import RoleDropdown from "../components/RoleSelector/RoleDropdown";
import { DerrameCoords, RolInfo } from "../types/simulacro";

// Dynamic import para MapCard (Leaflet, evitar SSR)
const MapCard = dynamic(() => import("../components/UI/MapCard"), {
  ssr: false,
});

export default function LandingSimulacro() {
  const {
    rolSeleccionado,
    setRol,
    condiciones,
    setCondiciones,
    resetSimulacro,
    derrameCoords,
    setDerrameCoords, // <-- asegúrate de tener esto
  } = useSimulacro();

  // Nuevos estados para el flujo
  const [showDashboard, setShowDashboard] = useState(true);
  const [derrCoords, setDerrCoords] = useState<DerrameCoords | null>(null);
  const [role, setRole] = useState<RolInfo | null>(null);
  const [step, setStep] = useState<"map" | "role" | "enviro" | "sim">("map");

  const handleStart = () => {
    setShowDashboard(false);
    resetSimulacro();
    setDerrCoords(null);
    setRole(null);
    setStep("map");
  };

  const handleReset = () => {
    setShowDashboard(true);
    resetSimulacro();
    setDerrCoords(null);
    setRole(null);
    setStep("map");
  };

  // Renderiza Dashboard si corresponde
  if (showDashboard) {
    return <Dashboard onStart={handleStart} />;
  }

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
            roles={ROLES_INFO}
            selectedRole={role}
            onChange={setRole}
          />
          <button
            className="btn-accent"
            onClick={() => {
              setRol(role); // actualiza en contexto
              setStep("enviro");
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
      {step === "sim" && rolSeleccionado && condiciones && (
        <SimulacionMain
          rol={rolSeleccionado}
          condiciones={condiciones}
          onReset={handleReset}
        />
      )}
    </div>
  );
}

import React, { useState } from "react";
import SimulacionMain from "../components/SimulacionMain/SimulacionMain";
import Dashboard from "../components/Dashboard/Dashboard";
import {
  RolInfo,
  SimulacroCondicionesAmbientales,
  DerrameCoords,
} from "../types/simulacro";
import { ModoSimulador } from "../types/dualidad";

export default function LandingSimulacro() {
  const [showDashboard, setShowDashboard] = useState(true);
  const [step, setStep] = useState<"map" | "role" | "enviro" | "sim">("map");
  const [modo, setModo] = useState<ModoSimulador | null>(null);
  const [autoRol, setAutoRol] = useState<RolInfo | null>(null);
  const [autoCondiciones, setAutoCondiciones] =
    useState<SimulacroCondicionesAmbientales | null>(null);
  const [autoCoords, setAutoCoords] = useState<DerrameCoords | null>(null);

  // Nuevo handleStart para recibir datos generados
  const handleStart = (
    modoElegido: ModoSimulador,
    rol: RolInfo,
    condiciones: SimulacroCondicionesAmbientales,
    coords: DerrameCoords
  ) => {
    setShowDashboard(false);
    setAutoRol(rol);
    setAutoCondiciones(condiciones);
    setAutoCoords(coords);
    setModo(modoElegido);
    setStep("sim");
  };

  const handleReset = () => {
    setShowDashboard(true);
    setAutoRol(null);
    setAutoCondiciones(null);
    setAutoCoords(null);
    setStep("map");
    setModo(null);
  };

  // Renderiza Dashboard si corresponde
  if (showDashboard) {
    return <Dashboard onStart={handleStart} />;
  }

  // Paso 4: Simulación principal
  if (step === "sim" && autoRol && autoCondiciones && autoCoords && modo) {
    return (
      <SimulacionMain
        rol={autoRol.code}
        condiciones={autoCondiciones}
        onReset={handleReset}
        derramaCoords={autoCoords}
        modo={modo}
      />
    );
  }

  return null;
}

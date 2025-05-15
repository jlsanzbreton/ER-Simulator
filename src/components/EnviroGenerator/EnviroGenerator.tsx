import React, { useState } from "react";
import {
  SimulacroCondicionesAmbientales,
  EnviroGeneratorProps,
} from "../../types/simulacro";
import { generarCondicionesAmbientales } from "../../utils/enviroMonteCarlo";
import CondicionCard from "./CondicionCard";
import { useSimulacro } from "../../context/SimulacroContext";
import dynamic from "next/dynamic";
const MapCard = dynamic(() => import("../UI/MapCard"), { ssr: false });

const EnviroGenerator: React.FC<EnviroGeneratorProps> = ({ onGenerated }) => {
  // Ahora usa sólo las coords del contexto
  const { derrameCoords } = useSimulacro();
  const [condiciones, setCondiciones] =
    useState<SimulacroCondicionesAmbientales | null>(null);

  // Si no hay coordenadas, no deberíamos estar aquí, pero por si acaso:
  if (!derrameCoords) {
    return (
      <div className="card card-max card-centered">
        <h2 className="h2">
          Error: No se han definido las coordenadas del derrame.
        </h2>
        <p>Por favor, vuelve al paso anterior y selecciona una ubicación.</p>
      </div>
    );
  }

  const handleGenerar = () => {
    const conds = generarCondicionesAmbientales();
    setCondiciones(conds);
  };

  const handleConfirmar = () => {
    if (condiciones) {
      onGenerated(condiciones);
    }
  };

  // Solo genera condiciones
  return (
    <div>
      <h1>Condiciones Ambientales del Simulacro</h1>
      <MapCard coords={derrameCoords} />
      <h2>Coordenadas del derrame</h2>
      <p>
        Ubicación del derrame: {derrameCoords.lat}, {derrameCoords.lng}
      </p>

      {!condiciones ? (
        <button onClick={handleGenerar}>Generar condiciones</button>
      ) : (
        <div>
          <CondicionCard condiciones={condiciones} />
          <button onClick={handleConfirmar} className="mt-2">
            Usar estas condiciones
          </button>
          <button onClick={handleGenerar} className="mt-2 button-accent">
            Volver a generar
          </button>
        </div>
      )}
    </div>
  );
};

export default EnviroGenerator;

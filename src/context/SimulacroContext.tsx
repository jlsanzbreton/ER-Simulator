// Contexto global con estado y helpers
import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  RolSimulacro,
  SimulacroCondicionesAmbientales,
  SimulacroState,
  DerrameCoords,
} from "../types/simulacro";

interface SimulacroContextType extends SimulacroState {
  setRol: (rol: RolSimulacro) => void;
  setCondiciones: (cond: SimulacroCondicionesAmbientales) => void;
  resetSimulacro: () => void;
  derrameCoords: DerrameCoords | null;
  setDerrameCoords: (coords: DerrameCoords | null) => void;
}

const SimulacroContext = createContext<SimulacroContextType | undefined>(
  undefined
);

export const SimulacroProvider = ({ children }: { children: ReactNode }) => {
  const [rolSeleccionado, setRolSeleccionado] = useState<
    RolSimulacro | undefined
  >(undefined);
  const [condiciones, setCondiciones] = useState<
    SimulacroCondicionesAmbientales | undefined
  >(undefined);
  const [derrameCoords, setDerrameCoords] = useState<DerrameCoords | null>(
    null
  );

  const resetSimulacro = () => {
    setRolSeleccionado(undefined);
    setCondiciones(undefined);
    setDerrameCoords(null); // <--- reinicia coordenadas
  };

  return (
    <SimulacroContext.Provider
      value={{
        rolSeleccionado,
        condiciones,
        setRol: setRolSeleccionado,
        setCondiciones,
        resetSimulacro,
        derrameCoords,
        setDerrameCoords,
      }}
    >
      {children}
    </SimulacroContext.Provider>
  );
};

// Hook para usar el contexto fácilmente
export const useSimulacro = () => {
  const ctx = useContext(SimulacroContext);
  if (!ctx)
    throw new Error("useSimulacro debe usarse dentro de SimulacroProvider");
  return ctx;
};

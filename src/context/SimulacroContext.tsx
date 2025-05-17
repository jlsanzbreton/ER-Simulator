// Contexto global con estado y helpers
import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  RolSimulacro,
  SimulacroCondicionesAmbientales,
  SimulacroState,
  DerrameCoords,
} from "../types/simulacro";
import { ROLES_PERMISOS, PermisosRol } from "../utils/rolesPermisos";

interface SimulacroContextType extends SimulacroState {
  setRol: (rol: RolSimulacro) => void;
  setCondiciones: (cond: SimulacroCondicionesAmbientales) => void;
  resetSimulacro: () => void;
  derrameCoords: DerrameCoords | null;
  setDerrameCoords: (coords: DerrameCoords | null) => void;
  permisosRol: PermisosRol | null;
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
  // Nuevo: permisos del rol seleccionado
  const permisosRol = rolSeleccionado
    ? ROLES_PERMISOS[rolSeleccionado] || null
    : null;

  const resetSimulacro = () => {
    setRolSeleccionado(undefined);
    setCondiciones(undefined);
    setDerrameCoords(null); // <--- reinicia coordenadas
    // No es necesario resetear permisosRol, se recalcula automáticamente
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
        permisosRol, // Nuevo: expone permisos actuales
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

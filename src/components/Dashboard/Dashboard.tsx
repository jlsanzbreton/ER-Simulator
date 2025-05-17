// src/components/Dashboard/Dashboard.tsx
import React, { useState } from "react";
import { ModoSimulador } from "../../types/dualidad";

const Dashboard: React.FC<{ onStart: (modo: ModoSimulador) => void }> = ({
  onStart,
}) => {
  const [modo, setModo] = useState<ModoSimulador | null>(null);

  return (
    <div className="card card-max card-centered flex-column text-center">
      <h1>Simulador de Emergencias ER-Simulator</h1>
      <p>
        Bienvenido al simulador avanzado de derrames en el litoral andaluz.
        Elige el modo de uso y gestiona la emergencia según la normativa real.
      </p>
      <div className="dashboard-links dashboard-modos">
        <button
          className={`btn-accent${modo === "entrenamiento" ? " selected" : ""}`}
          onClick={() => setModo("entrenamiento")}
        >
          Entrenamiento
        </button>
        <button
          className={`btn-accent${modo === "simulacro" ? " selected" : ""}`}
          onClick={() => setModo("simulacro")}
        >
          Simulacro real / Coordinación
        </button>
      </div>
      <button
        className="btn-success"
        onClick={() => modo && onStart(modo)}
        disabled={!modo}
      >
        Empezar
      </button>
      <div className="mt-2">
        <a
          href="https://www.boe.es/buscar/doc.php?id=BOE-A-2012-15482"
          target="_blank"
          rel="noopener noreferrer"
        >
          Consultar Real Decreto 1695/2012
        </a>
      </div>
      <div className="mt-2">
        <a
          href="https://www.juntadeandalucia.es/medioambiente/servtc5/pecla/pecla.htm"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver PECLA Andalucía
        </a>
      </div>
    </div>
  );
};

export default Dashboard;

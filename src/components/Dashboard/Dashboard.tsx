// src/components/Dashboard/Dashboard.tsx
import React from "react";

const Dashboard: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="card card-max card-centered flex-column text-center">
    <h1>Simulador de Emergencias ER-Simulator</h1>
    <p>
      Bienvenido al simulador avanzado de derrames en el litoral andaluz. Elige
      tu rol, define condiciones ambientales y gestiona la emergencia según la
      normativa real.
    </p>
    <button onClick={onStart}>Empezar Simulación</button>
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

export default Dashboard;

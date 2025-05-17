// src/components/SimulacionMain/ChecklistCumplimiento.tsx
// Checklist de Cumplimiento para simulacro real
// Visible solo para roles con permiso puedeMarcarChecks
// Trazabilidad: ver CopilotGuidelines.json, DrillGuide.json

import React, { useState } from "react";
import { SimulacroChecksLog } from "../../types/checks";

interface ChecklistCumplimientoProps {
  checks: SimulacroChecksLog;
  onCheck: (id: string, observaciones?: string) => void;
  usuario: string; // id o nombre del usuario/rol que marca
  faseActual?: string; // opcional, para filtrar por fase
}

const ChecklistCumplimiento: React.FC<ChecklistCumplimientoProps> = ({
  checks,
  onCheck,
  faseActual,
}) => {
  const [obs, setObs] = useState<Record<string, string>>({});

  // Filtra por fase si se indica
  const checksFiltrados = faseActual
    ? checks.filter((c) => c.fase === faseActual)
    : checks;

  return (
    <div className="card card-max card-centered mt-2">
      <h2>Checklist de Cumplimiento</h2>
      <ul className="list-unstyled">
        {checksFiltrados.map((check) => (
          <li key={check.id} className="mb-1">
            <div>
              <b>{check.descripcion}</b>
              {check.obligatorio && (
                <span className="check-obligatorio">*</span>
              )}
            </div>
            {check.marcadoPor ? (
              <div className="mt-1">
                <span className="check-marcado">
                  ✔ Marcado por {check.marcadoPor}
                </span>
                {check.horaMarcado && (
                  <span className="check-hora">
                    ({new Date(check.horaMarcado).toLocaleString()})
                  </span>
                )}
                {check.observaciones && (
                  <div className="check-obs mt-1">
                    Obs: {check.observaciones}
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-1">
                <textarea
                  placeholder="Observaciones (opcional)"
                  value={obs[check.id] || ""}
                  onChange={(e) =>
                    setObs({ ...obs, [check.id]: e.target.value })
                  }
                  rows={2}
                />
                <button
                  className="btn-accent"
                  onClick={() => onCheck(check.id, obs[check.id])}
                >
                  Marcar como cumplido
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-2 role-desc check-leyenda">
        * Obligatorio según normativa
      </div>
    </div>
  );
};

export default ChecklistCumplimiento;

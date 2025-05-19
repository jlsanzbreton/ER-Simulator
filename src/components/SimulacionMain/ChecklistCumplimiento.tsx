// src/components/SimulacionMain/ChecklistCumplimiento.tsx
// Checklist de Cumplimiento para simulacro real
// Visible solo para roles con permiso puedeMarcarChecks
// Trazabilidad: ver CopilotGuidelines.json, DrillGuide.json

import React, { useState } from "react";
import { CheckNormativo } from "../../types/checks";
import { FaEdit } from "react-icons/fa";

interface ChecklistCumplimientoProps {
  checks: CheckNormativo[];
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
  const [editando, setEditando] = useState<Record<string, boolean>>({});

  // Filtra por fase si se indica
  const checksFiltrados = faseActual
    ? checks // los checks ya vienen filtrados por fase en el flujo actual
    : checks;

  return (
    <div className="card card-max card-centered mt-2">
      <h2>Checklist de Cumplimiento</h2>
      <ul className="list-unstyled">
        {checksFiltrados.map((check) => (
          <li
            key={check.id}
            className={`mb-1 checklist-item${
              check.cumplido ? " checklist-item-done" : ""
            }${check.obligatorio ? " checklist-item-oblig" : ""}${
              check.cumplido && editando[check.id]
                ? " checklist-item-editing"
                : ""
            }`}
            data-check-cumplido={check.cumplido ? "true" : undefined}
          >
            <div className="check-desc-row">
              <b>{check.descripcion}</b>
              {check.obligatorio && (
                <span className="check-obligatorio" title="Obligatorio">
                  *
                </span>
              )}
              {check.cumplido && (
                <span className="check-timestamp">
                  {check.timestamp
                    ? new Date(check.timestamp).toLocaleString()
                    : ""}
                </span>
              )}
            </div>
            {check.cumplido && !editando[check.id] ? (
              <div className="mt-1 check-marcado">
                ✔ Cumplido
                {typeof check.evidencia === "string" &&
                check.evidencia.trim() !== "" ? (
                  <span className="check-obs ml-2">{check.evidencia}</span>
                ) : (
                  <span className="check-obs ml-2 check-obs-vacio">
                    (Sin anotación)
                  </span>
                )}
                <span
                  className="check-edit-toggle"
                  onClick={() => {
                    setEditando((prev) => ({ ...prev, [check.id]: true }));
                    setObs((prev) => ({
                      ...prev,
                      [check.id]:
                        prev[check.id] !== undefined
                          ? prev[check.id]
                          : check.evidencia || "",
                    }));
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label="Editar evidencia"
                >
                  <FaEdit className="check-edit-icon" />
                  Editar
                </span>
              </div>
            ) : (
              <div className="mt-1">
                <textarea
                  placeholder="Observaciones (opcional)"
                  value={
                    obs[check.id] !== undefined
                      ? obs[check.id]
                      : check.evidencia || ""
                  }
                  onChange={(e) =>
                    setObs({ ...obs, [check.id]: e.target.value })
                  }
                  rows={2}
                  disabled={check.cumplido && !editando[check.id]}
                  className={
                    check.cumplido && editando[check.id]
                      ? "check-editing"
                      : undefined
                  }
                />
                <button
                  className={`btn-accent${
                    check.cumplido && !editando[check.id] ? " btn-disabled" : ""
                  }`}
                  onClick={() => {
                    onCheck(check.id, obs[check.id]);
                    setEditando((prev) => ({ ...prev, [check.id]: false }));
                    setObs((prev) => {
                      const nuevo = { ...prev };
                      delete nuevo[check.id];
                      return nuevo;
                    });
                  }}
                  disabled={check.cumplido && !editando[check.id]}
                >
                  {check.cumplido && editando[check.id]
                    ? "Actualizar nota"
                    : "Marcar como cumplido"}
                </button>
                {check.cumplido && editando[check.id] && (
                  <button
                    className="btn-accent ml-2"
                    onClick={() => {
                      setEditando((prev) => ({ ...prev, [check.id]: false }));
                      setObs((prev) => {
                        const nuevo = { ...prev };
                        delete nuevo[check.id];
                        return nuevo;
                      });
                    }}
                  >
                    Cancelar
                  </button>
                )}
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

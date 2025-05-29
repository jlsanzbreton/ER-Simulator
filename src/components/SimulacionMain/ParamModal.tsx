import React, { useState } from "react";
import { useSimulacro } from "../../context/SimulacroContext";
import {
  RolSimulacro,
  SimulacroCondicionesAmbientales,
} from "../../types/simulacro";

const ParamModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    rolSeleccionado,
    setRol,
    condiciones,
    setCondiciones,
    derrameCoords,
    setDerrameCoords,
  } = useSimulacro();

  // Inicializar con valores por defecto compatibles con los tipos correctos
  const [localRol, setLocalRol] = useState<RolSimulacro>(
    rolSeleccionado || "OBSERVADOR"
  );
  const [localCond, setLocalCond] = useState<SimulacroCondicionesAmbientales>(
    condiciones || {
      temperatura: 18,
      viento: { direccion: "N", fuerza: 2 },
      hora: "12:00",
      marea: "ALTA",
      precipitacion: "NINGUNA",
      resumen: "Condiciones estables",
    }
  );
  const [localCoords, setLocalCoords] = useState(
    derrameCoords || {
      lat: 36.5,
      lng: -6.0,
    }
  );

  const handleSave = () => {
    setRol(localRol);
    setCondiciones(localCond);
    setDerrameCoords(localCoords);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Parámetros de la Simulación</h2>

        <div className="form-group">
          <label htmlFor="rol-select">Rol:</label>
          <select
            id="rol-select"
            value={localRol}
            onChange={(e) => setLocalRol(e.target.value as RolSimulacro)}
            aria-label="Selecciona un rol"
          >
            <option value="OBSERVADOR">Observador</option>
            <option value="ORGANIZADOR">Coordinador</option>
            <option value="CAPITANIA">Capitanía</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="temperatura-input">Temperatura (°C):</label>
          <input
            id="temperatura-input"
            type="number"
            value={localCond.temperatura}
            onChange={(e) =>
              setLocalCond({
                ...localCond,
                temperatura: Number(e.target.value),
              })
            }
            aria-label="Temperatura en grados centígrados"
          />
        </div>

        <div className="form-group">
          <label htmlFor="viento-direccion">Dirección del viento:</label>
          <select
            id="viento-direccion"
            value={localCond.viento.direccion}
            onChange={(e) =>
              setLocalCond({
                ...localCond,
                viento: {
                  ...localCond.viento,
                  direccion: e.target.value as
                    | "N"
                    | "NE"
                    | "E"
                    | "SE"
                    | "S"
                    | "SO"
                    | "O"
                    | "NO",
                },
              })
            }
            aria-label="Dirección del viento"
          >
            <option value="N">Norte</option>
            <option value="NE">Noreste</option>
            <option value="E">Este</option>
            <option value="SE">Sureste</option>
            <option value="S">Sur</option>
            <option value="SO">Suroeste</option>
            <option value="O">Oeste</option>
            <option value="NO">Noroeste</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="viento-fuerza">Fuerza del viento:</label>
          <input
            id="viento-fuerza"
            type="number"
            min="0"
            max="12"
            value={localCond.viento.fuerza}
            onChange={(e) =>
              setLocalCond({
                ...localCond,
                viento: {
                  ...localCond.viento,
                  fuerza: Number(e.target.value),
                },
              })
            }
            aria-label="Fuerza del viento (escala Beaufort)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="marea-select">Marea:</label>
          <select
            id="marea-select"
            value={localCond.marea}
            onChange={(e) =>
              setLocalCond({
                ...localCond,
                marea: e.target.value as
                  | "ALTA"
                  | "BAJA"
                  | "PLEAMAR"
                  | "BAJAMAR",
              })
            }
            aria-label="Estado de la marea"
          >
            <option value="ALTA">Alta</option>
            <option value="BAJA">Baja</option>
            <option value="PLEAMAR">Pleamar</option>
            <option value="BAJAMAR">Bajamar</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="hora-input">Hora:</label>
          <input
            id="hora-input"
            type="text"
            value={localCond.hora}
            onChange={(e) =>
              setLocalCond({ ...localCond, hora: e.target.value })
            }
            placeholder="HH:MM"
            aria-label="Hora del incidente"
          />
        </div>

        <div className="form-group">
          <label htmlFor="precipitacion-select">Precipitación:</label>
          <select
            id="precipitacion-select"
            value={localCond.precipitacion}
            onChange={(e) =>
              setLocalCond({
                ...localCond,
                precipitacion: e.target.value as
                  | "NINGUNA"
                  | "LLUVIA_LIGERA"
                  | "LLUVIA_INTENSA"
                  | "TORMENTA"
                  | "CALIMA",
              })
            }
            aria-label="Tipo de precipitación"
          >
            <option value="NINGUNA">Ninguna</option>
            <option value="LLUVIA_LIGERA">Lluvia ligera</option>
            <option value="LLUVIA_INTENSA">Lluvia intensa</option>
            <option value="TORMENTA">Tormenta</option>
            <option value="CALIMA">Calima</option>
          </select>
        </div>

        <div className="form-group">
          <label>Coordenadas del Derrame:</label>
          <div className="coords-container">
            <div className="coord-input">
              <label htmlFor="lat-input">Latitud:</label>
              <input
                id="lat-input"
                type="number"
                step="0.0001"
                value={localCoords.lat}
                onChange={(e) =>
                  setLocalCoords({
                    ...localCoords,
                    lat: Number(e.target.value),
                  })
                }
                aria-label="Latitud del derrame"
              />
            </div>
            <div className="coord-input">
              <label htmlFor="lng-input">Longitud:</label>
              <input
                id="lng-input"
                type="number"
                step="0.0001"
                value={localCoords.lng}
                onChange={(e) =>
                  setLocalCoords({
                    ...localCoords,
                    lng: Number(e.target.value),
                  })
                }
                aria-label="Longitud del derrame"
              />
            </div>
          </div>
        </div>

        <div className="button-group">
          <button onClick={handleSave}>Guardar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ParamModal;

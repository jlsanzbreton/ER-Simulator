import React, { useState } from "react";
import { useSimulacro } from "../../context/SimulacroContext";
import Image from "next/image";
import {
  RolSimulacro,
  SimulacroCondicionesAmbientales,
} from "../../types/simulacro";
import { ROLES_INFO } from "../../utils/rolesData";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {
  FaWind,
  FaTemperatureHigh,
  FaClock,
  FaUser,
  FaWater,
  FaCloudRain,
  FaMapMarkerAlt,
  FaArrowCircleUp,
  FaInfoCircle,
  FaTimes,
  FaCog,
} from "react-icons/fa";

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

  // Función para determinar color de la temperatura
  const getTempColor = (temp: number): string => {
    if (temp <= 10) return "#0077b6"; // Frío
    if (temp <= 20) return "#48cae4"; // Templado
    if (temp <= 30) return "#fb8500"; // Cálido
    return "#dc2f02"; // Caliente
  };

  // Función para obtener el nombre corto de la dirección del viento
  const getWindDirectionName = (dir: string): string => {
    const names: Record<string, string> = {
      N: "Norte",
      NE: "Noreste",
      E: "Este",
      SE: "Sureste",
      S: "Sur",
      SO: "Suroeste",
      O: "Oeste",
      NO: "Noroeste",
    };
    return names[dir] || dir;
  };

  // Función para convertir grados en dirección de viento
  const degreesToDirection = (degrees: number): string => {
    const directions = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  const getWindDirectionDegrees = (dir: string): number => {
    const directions = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"];
    return directions.indexOf(dir) * 45;
  };

  // Obtener el rol actual
  const currentRoleInfo = ROLES_INFO.find((role) => role.code === localRol);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <h2>
            <FaCog className="modal-title-icon" /> Parámetros de la Simulación
          </h2>
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <FaTimes />
          </button>
        </div>

        <div className="modal-content">
          {/* Sección del Rol con icono y descripción */}
          <div className="param-section">
            <div className="param-section-header">
              <FaUser className="param-icon" />
              <h3>Rol del Usuario</h3>
              <div className="tooltip-container">
                <FaInfoCircle className="info-icon" />
                <span className="tooltip-text">
                  El rol determina tus permisos y capacidades durante la
                  simulación
                </span>
              </div>
            </div>

            <div className="role-selector">
              <div className="role-info">
                {currentRoleInfo?.icon && (
                  <Image
                    src={currentRoleInfo.icon}
                    alt={currentRoleInfo.displayName}
                    width={40}
                    height={40}
                    className="role-icon"
                  />
                )}
                <div className="role-description">
                  <strong>{currentRoleInfo?.displayName || localRol}</strong>
                  <p>
                    {currentRoleInfo?.description ||
                      "Selecciona un rol para la simulación"}
                  </p>
                </div>
              </div>

              <select
                id="rol-select"
                value={localRol}
                onChange={(e) => setLocalRol(e.target.value as RolSimulacro)}
                aria-label="Selecciona un rol"
                className="role-dropdown"
              >
                <option value="OBSERVADOR">Observador</option>
                <option value="ORGANIZADOR">Coordinador</option>
                <option value="CAPITANIA">Capitanía</option>
                <option value="PECLA">PECLA</option>
              </select>
            </div>
          </div>

          {/* Sección de Condiciones Ambientales */}
          <div className="param-section">
            <div className="param-section-header">
              <FaTemperatureHigh className="param-icon" />
              <h3>Condiciones Ambientales</h3>
              <div className="tooltip-container">
                <FaInfoCircle className="info-icon" />
                <span className="tooltip-text">
                  Estas condiciones afectan el comportamiento del derrame
                </span>
              </div>
            </div>

            <div className="params-grid">
              {/* Control de Temperatura con slider visual */}
              <div className="param-card">
                <div className="param-card-header">
                  <FaTemperatureHigh
                    className={`temp-icon temp-${
                      localCond.temperatura <= 10
                        ? "cold"
                        : localCond.temperatura <= 20
                        ? "cool"
                        : localCond.temperatura <= 30
                        ? "warm"
                        : "hot"
                    }`}
                  />
                  <label htmlFor="temperatura-slider">Temperatura</label>
                </div>
                <div className="slider-container">
                  <div
                    className={`slider-value temp-${
                      localCond.temperatura <= 10
                        ? "cold"
                        : localCond.temperatura <= 20
                        ? "cool"
                        : localCond.temperatura <= 30
                        ? "warm"
                        : "hot"
                    }`}
                  >
                    {localCond.temperatura}°C
                  </div>
                  <Slider
                    id="temperatura-slider"
                    min={0}
                    max={40}
                    value={localCond.temperatura}
                    onChange={(value) =>
                      setLocalCond({
                        ...localCond,
                        temperatura:
                          typeof value === "number"
                            ? value
                            : localCond.temperatura,
                      })
                    }
                    trackStyle={{
                      backgroundColor: getTempColor(localCond.temperatura),
                    }}
                    handleStyle={{
                      borderColor: getTempColor(localCond.temperatura),
                      backgroundColor: "#fff",
                    }}
                    railStyle={{ backgroundColor: "#ddd" }}
                    aria-label="Temperatura en grados centígrados"
                  />
                  <div className="slider-labels">
                    <span>Frío</span>
                    <span>Calor</span>
                  </div>
                </div>
              </div>

              {/* Control de Viento con rosa de los vientos */}
              <div className="param-card wind-card">
                <div className="param-card-header">
                  <FaWind />
                  <label>Viento</label>
                </div>
                <div className="wind-controls">
                  <div className="wind-direction-container">
                    <div className="wind-rose">
                      <div className="compass-outer">
                        <div className="compass-marker north">N</div>
                        <div className="compass-marker east">E</div>
                        <div className="compass-marker south">S</div>
                        <div className="compass-marker west">O</div>
                        <div
                          className={`wind-arrow wind-dir-${localCond.viento.direccion}`}
                        >
                          <FaArrowCircleUp />
                        </div>
                      </div>
                    </div>
                    <div className="wind-direction-selector">
                      <label htmlFor="viento-direccion">Dirección:</label>
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
                        className="direction-select"
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
                  </div>

                  <div className="wind-force">
                    <label htmlFor="viento-fuerza">
                      Fuerza{" "}
                      <span className="wind-force-value">
                        {localCond.viento.fuerza}
                      </span>{" "}
                      kt
                    </label>
                    <Slider
                      id="viento-fuerza"
                      min={0}
                      max={12}
                      value={localCond.viento.fuerza}
                      onChange={(value) =>
                        setLocalCond({
                          ...localCond,
                          viento: {
                            ...localCond.viento,
                            fuerza:
                              typeof value === "number"
                                ? value
                                : localCond.viento.fuerza,
                          },
                        })
                      }
                      trackStyle={{ backgroundColor: "#0077b6" }}
                      handleStyle={{
                        borderColor: "#0077b6",
                        backgroundColor: "#fff",
                      }}
                      railStyle={{ backgroundColor: "#ddd" }}
                      aria-label="Fuerza del viento (escala Beaufort)"
                    />
                    <div className="slider-labels">
                      <span>Suave</span>
                      <span>Fuerte</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Control de Hora */}
              <div className="param-card">
                <div className="param-card-header">
                  <FaClock />
                  <label htmlFor="hora-input">Hora del Incidente</label>
                </div>
                <div className="time-input-container">
                  <input
                    id="hora-input"
                    type="time"
                    value={localCond.hora}
                    onChange={(e) =>
                      setLocalCond({ ...localCond, hora: e.target.value })
                    }
                    placeholder="HH:MM"
                    aria-label="Hora del incidente"
                    className="time-input"
                  />
                </div>
              </div>

              {/* Control de Marea */}
              <div className="param-card">
                <div className="param-card-header">
                  <FaWater />
                  <label htmlFor="marea-select">Marea</label>
                </div>
                <div className="marea-selector">
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
                    className="marea-select"
                  >
                    <option value="ALTA">Alta</option>
                    <option value="BAJA">Baja</option>
                    <option value="PLEAMAR">Pleamar</option>
                    <option value="BAJAMAR">Bajamar</option>
                  </select>
                  <div className="marea-visual">
                    {localCond.marea === "ALTA" ||
                    localCond.marea === "PLEAMAR" ? (
                      <div className="marea-high">
                        <div className="wave wave1"></div>
                        <div className="wave wave2"></div>
                      </div>
                    ) : (
                      <div className="marea-low">
                        <div className="wave-low"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Control de Precipitación */}
              <div className="param-card">
                <div className="param-card-header">
                  <FaCloudRain />
                  <label htmlFor="precipitacion-select">Precipitación</label>
                </div>
                <div className="precipitacion-container">
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
                    className="precipitacion-select"
                  >
                    <option value="NINGUNA">Ninguna</option>
                    <option value="LLUVIA_LIGERA">Lluvia ligera</option>
                    <option value="LLUVIA_INTENSA">Lluvia intensa</option>
                    <option value="TORMENTA">Tormenta</option>
                    <option value="CALIMA">Calima</option>
                  </select>
                  <div
                    className={`precipitacion-icon precipitacion-${localCond.precipitacion.toLowerCase()}`}
                  >
                    {localCond.precipitacion !== "NINGUNA" && (
                      <div className="precipitation-effect"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sección de Coordenadas del Derrame */}
          <div className="param-section">
            <div className="param-section-header">
              <FaMapMarkerAlt className="param-icon" />
              <h3>Localización del Derrame</h3>
              <div className="tooltip-container">
                <FaInfoCircle className="info-icon" />
                <span className="tooltip-text">
                  Coordenadas donde se inicia el derrame en el mar
                </span>
              </div>
            </div>

            <div className="coords-card">
              <div className="coords-inputs">
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
                    className="coord-number-input"
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
                    className="coord-number-input"
                  />
                </div>
              </div>

              <div className="coords-visual">
                <div className="coords-map-placeholder">
                  <FaMapMarkerAlt className="map-marker" />
                  <span className="coords-text">
                    {localCoords.lat.toFixed(4)}, {localCoords.lng.toFixed(4)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-primary" onClick={handleSave}>
            Aplicar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParamModal;

// src/components/Dashboard/Dashboard.tsx
import React, { useState } from "react";
import { ModoSimulador } from "../../types/dualidad";
import {
  generarRolAleatorio,
  //generarCoordenadasValidas,comento temporariamente para evitar error de importación
} from "../../utils/generadoresSimulacion";
import { generarCondicionesAmbientales } from "../../utils/enviroMonteCarlo";
import {
  RolInfo,
  SimulacroCondicionesAmbientales,
  DerrameCoords,
} from "../../types/simulacro";

const Dashboard: React.FC<{
  onStart: (
    modo: ModoSimulador,
    rol: RolInfo,
    condiciones: SimulacroCondicionesAmbientales,
    coords: DerrameCoords
  ) => void;
}> = ({ onStart }) => {
  const [modal, setModal] = useState<ModoSimulador | null>(null);

  const handleSelect = (modo: ModoSimulador) => {
    setModal(modo);
  };
  const handleConfirm = async () => {
    if (modal) {
      const rol = generarRolAleatorio(modal);
      const condiciones = generarCondicionesAmbientales();
      // Cargar geojson dinámicamente (fetch desde public)
      // const res = await fetch("/geojson/andalucia-v2.geojson");
      // const geojson = await res.json();
      const coords = { lat: 36.7, lng: -3.9 }; // Coordenadas ficticias para pruebas
      onStart(modal, rol, condiciones, coords);
    }
    setModal(null);
  };
  const handleCancel = () => setModal(null);

  return (
    <div className="dashboard-container fade-in">
      {/* Cabecera con olas y logo */}
      <div className="ocean-header">
        <div className="wave-container">
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
        </div>
        <div className="header-content header-flex">
          <div className="logo-container small-logo">
            {/* Logo SVG personalizado estilo marino */}
            <svg className="dashboard-logo" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="#58a5f0" />
              <path
                d="M50,10 A40,40 0 0,1 90,50 A40,40 0 0,1 50,90 A40,40 0 0,1 10,50 A40,40 0 0,1 50,10 Z"
                fill="none"
                stroke="#0277bd"
                strokeWidth="2"
              />
              <path
                d="M25,50 Q35,40 45,50 Q55,60 65,50 Q75,40 85,50"
                fill="none"
                stroke="white"
                strokeWidth="3"
              />
              <path
                d="M15,60 Q25,50 35,60 Q45,70 55,60 Q65,50 75,60"
                fill="none"
                stroke="white"
                strokeWidth="3"
              />
              <path
                d="M50,20 L50,30 M40,25 L60,25"
                stroke="#f57c00"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle cx="50" cy="35" r="5" fill="#f57c00" />
            </svg>
          </div>
          <h1>Simulador de Emergencias ER-Simulator</h1>
        </div>
      </div>

      {/* Hero principal */}
      <div className="dashboard-hero card card-max card-centered">
        <p className="dashboard-description">
          Bienvenido al simulador avanzado de derrames en el litoral andaluz.
          Elige el modo de uso y gestiona la emergencia según la normativa real.
        </p>
        <div className="mode-selector">
          <div
            className={`mode-card`}
            onClick={() => handleSelect("entrenamiento")}
            tabIndex={0}
            role="button"
            aria-label="Seleccionar modo entrenamiento"
          >
            <div className="mode-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12l2 2 4-4" />
              </svg>
            </div>
            <h3>Entrenamiento</h3>
            <p>Practica la gestión de emergencias.</p>
          </div>
          <div
            className={`mode-card`}
            onClick={() => handleSelect("simulacro")}
            tabIndex={0}
            role="button"
            aria-label="Seleccionar modo simulacro"
          >
            <div className="mode-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M16 8v8M8 8v8" />
              </svg>
            </div>
            <h3>Simulacro real / Coordinación</h3>
            <p>Gestiona un simulacro.</p>
          </div>
        </div>
      </div>
      {/* Modal de confirmación */}
      {modal && (
        <div className="modal-bg">
          <div className="modal card">
            <h2>
              ¿Iniciar modo{" "}
              {modal === "entrenamiento" ? "Entrenamiento" : "Simulacro"}?
            </h2>
            <p>
              Al aceptar, se generarán automáticamente:
              <ul>
                <li>
                  El <b>Rol</b> asignado al azar.
                </li>
                <li>
                  Las <b>Condiciones meteorológicas</b> y de corrientes
                  aleatorias.
                </li>
                <li>
                  Las <b>Coordenadas del derrame</b> realistas (siempre al sur y
                  a menos de 20 km de la línea de costa).
                </li>
              </ul>
              {modal === "simulacro" ? (
                <>
                  <b>En modo simulacro</b>, podrás editar todos estos parámetros
                  desde la pantalla principal de la simulación.
                </>
              ) : (
                <>
                  <b>En modo entrenamiento</b>, sólo podrás cambiar el rol; el
                  resto de parámetros serán aleatorios y fijos.
                </>
              )}
            </p>
            <div className="modal-actions">
              <button className="start-button" onClick={handleConfirm}>
                Aceptar
              </button>
              <button className="start-button secondary" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sección de características */}
      <section className="features-section">
        <h2>¿Qué puedes hacer con ER-Simulator?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 20v-6M12 4v4M4 12h4M16 12h4" />
              </svg>
            </div>
            <h3>Simulación Normativa</h3>
            <p>
              Reproduce fielmente los protocolos y fases reales de la normativa
              española y andaluza.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12l2 2 4-4" />
              </svg>
            </div>
            <h3>Checklist Interactivo</h3>
            <p>
              Marca acciones, añade evidencias y sigue el avance de la
              emergencia en tiempo real.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M16 8v8M8 8v8" />
              </svg>
            </div>
            <h3>Colaboración y Roles</h3>
            <p>
              Asigna roles, colabora y coordina equipos como en una emergencia
              real.
            </p>
          </div>
        </div>
      </section>

      {/* Diagrama de proceso */}
      <div className="process-section card-wide">
        <h2>Proceso de simulación</h2>
        <div className="process-diagram process-diagram--compact">
          <div className="process-step">
            <div className="step-number">1</div>
            <div className="step-icon step-icon--small">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="32"
                height="32"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v8M8 12h8" strokeLinecap="round" />
              </svg>
            </div>
            <h4>Selección de ubicación</h4>
            <p>Elige el punto exacto del derrame en el mapa</p>
          </div>
          <div className="process-arrow">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M4 16h24m0 0l-6-6m6 6l-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="process-step">
            <div className="step-number">2</div>
            <div className="step-icon step-icon--small">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="32"
                height="32"
              >
                <path
                  d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h4>Asignación de rol</h4>
            <p>Define tu papel en la gestión de la emergencia</p>
          </div>
          <div className="process-arrow">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M4 16h24m0 0l-6-6m6 6l-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="process-step">
            <div className="step-number">3</div>
            <div className="step-icon step-icon--small">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="32"
                height="32"
              >
                <path
                  d="M18 10h-4v4h4v-4zM2 7a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7z"
                  strokeLinecap="round"
                />
                <path
                  d="M2 11h4M2 15h4M10 2v4M14 2v4M18 2v4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h4>Condiciones ambientales</h4>
            <p>Establece viento, oleaje y otros factores</p>
          </div>
          <div className="process-arrow">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M4 16h24m0 0l-6-6m6 6l-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="process-step">
            <div className="step-number">4</div>
            <div className="step-icon step-icon--small">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="32"
                height="32"
              >
                <path
                  d="M22 12h-4l-3 9L9 3l-3 9H2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h4>Gestión de emergencia</h4>
            <p>Controla la situación y toma decisiones</p>
          </div>
        </div>
      </div>

      {/* Zonas grises */}
      <div className="card card-wide grey-zones-card">
        <div className="grey-zones-content">
          <div className="grey-zones-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <path d="M12 9v4M12 17h.01" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <h2>¿Qué son las &quot;Zonas Grises&quot;?</h2>
            <p>
              Áreas, actividades o interfaces entre equipos/sistemas que suelen
              ser ignoradas por ser repetitivas, conocidas, de otros
              departamentos o aparentemente poco peligrosas. Son focos
              habituales de siniestros y deben ser identificadas y gestionadas
              en el simulacro.
            </p>
            <p className="text-secondary example-text">
              <strong>Ejemplo:</strong> Un punto de transferencia entre el
              equipo de operaciones y el de mantenimiento donde nadie asume la
              responsabilidad directa ante una anomalía.
            </p>
          </div>
        </div>
      </div>

      {/* Enlaces legales y normativos */}
      <div className="legal-links card-max">
        <h3>Recursos normativos</h3>
        <div className="links-container">
          <a
            href="https://www.boe.es/buscar/doc.php?id=BOE-A-2012-15482"
            target="_blank"
            rel="noopener noreferrer"
            className="legal-link"
          >
            <div className="link-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="link-text">
              <span>Real Decreto 1695/2012</span>
              <small>Normativa estatal de emergencias marítimas</small>
            </div>
          </a>
          <a
            href="https://www.juntadeandalucia.es/organismos/transparencia/planificacion-evaluacion-estadistica/planes/detalle/11668.html"
            target="_blank"
            rel="noopener noreferrer"
            className="legal-link"
          >
            <div className="link-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12l2 2 4-4" />
              </svg>
            </div>
            <div className="link-text">
              <span>PECLA Andalucía</span>
              <small>
                Plan Territorial de Contingencias por Contaminación del Litoral
                Andaluz
              </small>
            </div>
          </a>
        </div>
      </div>

      {/* Pie de página con olas */}
      <div className="ocean-footer">
        <div className="footer-content">
          <p>ER-Simulator &copy; 2025 · Simulación de emergencias marítimas</p>
        </div>
        <div className="wave-container">
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
